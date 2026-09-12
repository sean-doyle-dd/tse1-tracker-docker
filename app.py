import os
import time
import psycopg2
import psycopg2.extras
from flask import Flask, g, jsonify, request, render_template

DATABASE_URL = os.environ.get(
    "DATABASE_URL", "postgresql://tse1:tse1pass@localhost:5432/tse1_tracker"
)

app = Flask(__name__)


def connect_with_retry(retries=30, delay=1):
    last_err = None
    for attempt in range(retries):
        try:
            conn = psycopg2.connect(DATABASE_URL)
            conn.autocommit = False
            return conn
        except psycopg2.OperationalError as e:
            last_err = e
            print(f"[startup] waiting for database... ({attempt + 1}/{retries})")
            time.sleep(delay)
    raise last_err


def get_db():
    if "db" not in g:
        g.db = connect_with_retry(retries=5, delay=1)
    return g.db


@app.teardown_appcontext
def close_db(exception=None):
    db = g.pop("db", None)
    if db is not None:
        if exception:
            db.rollback()
        db.close()


def init_db():
    conn = connect_with_retry()
    cur = conn.cursor()
    cur.execute(
        """CREATE TABLE IF NOT EXISTS progress (
            item_key TEXT PRIMARY KEY,
            done BOOLEAN NOT NULL DEFAULT FALSE
        )"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS tickets (
            id TEXT PRIMARY KEY,
            ref TEXT NOT NULL,
            area TEXT NOT NULL,
            issue TEXT,
            outcome TEXT,
            notes TEXT,
            created_at TEXT NOT NULL
        )"""
    )
    conn.commit()
    cur.close()
    conn.close()
    print("[startup] database ready")


@app.route("/")
def index():
    return render_template("index.html")


# ---- progress (30/60/90 checklist) ----

@app.route("/api/progress", methods=["GET"])
def get_progress():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT item_key, done FROM progress")
    rows = cur.fetchall()
    cur.close()
    return jsonify({r[0]: bool(r[1]) for r in rows})


@app.route("/api/progress", methods=["POST"])
def set_progress():
    data = request.get_json(force=True)
    key = data.get("key")
    done = bool(data.get("done"))
    if not key:
        return jsonify({"error": "key is required"}), 400
    db = get_db()
    cur = db.cursor()
    cur.execute(
        """INSERT INTO progress (item_key, done) VALUES (%s, %s)
           ON CONFLICT (item_key) DO UPDATE SET done = EXCLUDED.done""",
        (key, done),
    )
    db.commit()
    cur.close()
    return jsonify({"ok": True})


# ---- ticket log ----

@app.route("/api/tickets", methods=["GET"])
def list_tickets():
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT * FROM tickets ORDER BY created_at DESC, id DESC")
    rows = cur.fetchall()
    cur.close()
    return jsonify([dict(r) for r in rows])


@app.route("/api/tickets", methods=["POST"])
def create_ticket():
    data = request.get_json(force=True)
    ref = (data.get("ref") or "").strip()
    area = (data.get("area") or "").strip()
    if not ref or not area:
        return jsonify({"error": "ref and area are required"}), 400
    entry_id = str(int(time.time() * 1000))
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        """INSERT INTO tickets (id, ref, area, issue, outcome, notes, created_at)
           VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *""",
        (
            entry_id,
            ref,
            area,
            (data.get("issue") or "").strip(),
            (data.get("outcome") or "").strip(),
            (data.get("notes") or "").strip(),
            time.strftime("%Y-%m-%d"),
        ),
    )
    row = cur.fetchone()
    db.commit()
    cur.close()
    return jsonify(dict(row)), 201


@app.route("/api/tickets/<ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    db = get_db()
    cur = db.cursor()
    cur.execute("DELETE FROM tickets WHERE id = %s", (ticket_id,))
    db.commit()
    cur.close()
    return jsonify({"ok": True})


# ---- backup / restore ----

@app.route("/api/export", methods=["GET"])
def export_data():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT item_key, done FROM progress")
    progress = {r[0]: bool(r[1]) for r in cur.fetchall()}
    cur.close()
    cur = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT * FROM tickets ORDER BY created_at DESC")
    tickets = [dict(r) for r in cur.fetchall()]
    cur.close()
    return jsonify({"planProgress": progress, "ticketLog": tickets})


@app.route("/api/import", methods=["POST"])
def import_data():
    data = request.get_json(force=True)
    db = get_db()
    cur = db.cursor()
    progress = data.get("planProgress") or {}
    tickets = data.get("ticketLog") or []
    for key, done in progress.items():
        cur.execute(
            """INSERT INTO progress (item_key, done) VALUES (%s, %s)
               ON CONFLICT (item_key) DO UPDATE SET done = EXCLUDED.done""",
            (key, bool(done)),
        )
    for t in tickets:
        cur.execute(
            """INSERT INTO tickets (id, ref, area, issue, outcome, notes, created_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s)
               ON CONFLICT (id) DO NOTHING""",
            (
                t.get("id") or str(int(time.time() * 1000)),
                t.get("ref", ""),
                t.get("area", "other"),
                t.get("issue", ""),
                t.get("outcome", ""),
                t.get("notes", ""),
                t.get("created_at") or t.get("date") or time.strftime("%Y-%m-%d"),
            ),
        )
    db.commit()
    cur.close()
    return jsonify({"ok": True})


# simple liveness/readiness endpoint - handy for docker healthchecks
# and later as a target for a Datadog HTTP check
@app.route("/healthz")
def healthz():
    try:
        db = get_db()
        cur = db.cursor()
        cur.execute("SELECT 1")
        cur.close()
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "detail": str(e)}), 503


if __name__ == "__main__":
    init_db()
    print("TSE1 tracker running at http://0.0.0.0:5050")
    app.run(host="0.0.0.0", port=5050, debug=False)
