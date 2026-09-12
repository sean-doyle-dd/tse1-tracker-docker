# TSE1 ramp tracker (Docker + Postgres)

Same tracker — 30/60/90 plan and quick-tag ticket log — now backed by a
real Postgres database running in its own container, alongside the app
container. No browser storage, no flat files: `docker compose down` and
`up` again and your data is exactly where you left it, in a named Docker
volume.

## Run it

Requires Docker and Docker Compose.

```bash
cd tse1-tracker-docker
cp .env.example .env
# edit .env and set your own POSTGRES_PASSWORD
docker compose up --build
```

Credentials live in `.env`, not in `docker-compose.yml` — that file is
gitignored, so real values never end up committed. `docker-compose.yml`
only references `${POSTGRES_USER}` etc; Compose reads the actual values
from `.env` automatically since it's in the same directory.

Then open **http://127.0.0.1:5050**.

- `db` — Postgres 16, data lives in the `pgdata` named volume
- `web` — the Flask app + your existing HTML/JS frontend, waits for `db`
  to report healthy before starting

Stop everything with `docker compose down` (data persists). If you ever
want to wipe it and start clean: `docker compose down -v`.

## Backups

Same Export/Import buttons in the UI as before (JSON snapshot). You can
also dump the Postgres data directly:

```bash
docker exec tse1-db pg_dump -U tse1 tse1_tracker > backup.sql
```

## Adding Datadog monitoring later

The compose file has a commented-out `datadog-agent` service. To turn it
on:

1. Uncomment the `datadog-agent` block in `docker-compose.yml`.
2. Set your API key, e.g. in a `.env` file next to the compose file:
   ```
   DD_API_KEY=your_api_key_here
   ```
3. `docker compose up -d`

Once running, the agent auto-discovers both containers over the Docker
socket. A few starting points, given your interests:

- **Container monitoring** — CPU/memory/health for `tse1-web` and
  `tse1-db` show up immediately, no extra config.
- **Postgres integration** — uncomment the `labels:` block on the `db`
  service (autodiscovery annotation) and the Agent configures the
  Postgres check automatically — query metrics, connection counts,
  replication stats if you ever add a replica.
- **Log collection** — `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` is already
  set, so both containers' stdout/stderr ship to Datadog once logs are
  enabled on your account.
- **APM** — if you want traces for the Flask app itself later, add
  `ddtrace` to `requirements.txt` and run the app with `ddtrace-run
  python app.py` instead of `python app.py` in the Dockerfile.
- There's also a `/healthz` endpoint on the web app already, which is a
  natural target for a Datadog HTTP check if you want uptime monitoring
  on top of container-level checks.

## Project layout

```
tse1-tracker-docker/
  app.py              Flask app, talks to Postgres via psycopg2
  Dockerfile           Builds the web container
  docker-compose.yml   db + web services (+ optional datadog-agent)
  requirements.txt
  templates/index.html
  static/style.css
  static/app.js
```
