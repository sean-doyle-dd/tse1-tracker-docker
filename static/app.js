const PLAN = [
  { phase: "First 30 days — foundation", categories: [
    { title: "General", items: [
      { text: "Stand up a personal trial org and get the Agent running on a real host — poke around the actual status output and config files, not just the install one-liner.", link: { url: "https://docs.datadoghq.com/agent/", label: "Agent docs" } },
      { text: "Track down where the team's KB and runbooks actually live, and read the three most-viewed ones before you need them.", link: { url: "https://datadoghq.atlassian.net/wiki/search?text=runbook", label: "Confluence: runbooks" } },
      { text: "Shadow 3-5 tickets across different product areas — ask the senior TSE to narrate their diagnostic process out loud, not just show you the fix." },
      { text: "Learn the escalation path cold: who owns what, and what \"ready to escalate\" looks like.", link: { url: "https://datadoghq.atlassian.net/wiki/search?text=escalation%20path", label: "Confluence: escalation path" } },
    ]},
    { title: "Security", items: [
      { text: "Go past the overview: understand what a misconfiguration finding actually contains, and how CSPM, Workload Protection, and Identity Risk tie into one product.", link: { url: "https://docs.datadoghq.com/security/cloud_security_management/", label: "Cloud Security Management" } },
      { text: "Trace a misconfiguration finding end to end yourself — trigger an obvious one (public S3 bucket, permissive IAM) in a sandbox and watch it appear.", link: { url: "https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/", label: "Cloud Security Misconfigurations" } },
    ]},
    { title: "Cloud", items: [
      { text: "Set up a real AWS, Azure, or GCP integration end to end in your sandbox, including the IAM role — don't let a teammate click the buttons for you.", link: { url: "https://docs.datadoghq.com/integrations/guide/aws-manual-setup/", label: "AWS Manual Setup Guide" } },
      { text: "Read exactly what the SecurityAudit policy grants and why Datadog needs it.", link: { url: "https://docs.datadoghq.com/integrations/amazon-web-services/", label: "Amazon Web Services integration" } },
      { text: "Map the full data path from cloud account to UI, so an empty dashboard gives you a mental checklist of every hop that could be broken." },
    ]},
    { title: "Containers", items: [
      { text: "Deploy the Agent as a DaemonSet manually in a local cluster (minikube or kind) — no Helm chart doing the RBAC for you the first time.", link: { url: "https://docs.datadoghq.com/containers/guide/kubernetes_daemonset/", label: "Manually install the Agent with DaemonSet" } },
      { text: "Understand precisely what the Cluster Agent does that the node Agent can't (talk to the Kubernetes API server) and why that split exists.", link: { url: "https://docs.datadoghq.com/containers/cluster_agent/setup/", label: "Set Up the Datadog Cluster Agent" } },
    ]},
    { title: "Networking", items: [
      { text: "Find where the Agent's outbound traffic actually goes — ports, endpoints, how a proxy sits in front of it.", link: { url: "https://docs.datadoghq.com/agent/proxy/", label: "Datadog Agent Proxy Configuration" } },
      { text: "Understand what DNS resolution the Agent depends on, and what breaks when it can't resolve.", link: { url: "https://docs.datadoghq.com/agent/troubleshooting/", label: "Agent Troubleshooting" } },
      { text: "Get past the marketing description of NPM — understand what it captures at the conntrack level.", link: { url: "https://docs.datadoghq.com/network_monitoring/performance/", label: "Cloud Network Monitoring" } },
    ]},
  ]},
  { phase: "Days 30-60 — pattern recognition", categories: [
    { title: "General", items: [
      { text: "Own a ticket queue for a week with no senior co-piloting — including the ones you'd normally hand off." },
      { text: "Turn one real ticket into a KB article. Writing it down is what turns \"fixed it once\" into \"understand it.\"" },
    ]},
    { title: "Security", items: [
      { text: "Work a batch of CSM finding tickets and start building a mental list of the common false-positive patterns.", link: { url: "https://docs.datadoghq.com/security/cloud_security_management/triage_and_prioritize/", label: "Triage and Prioritize" } },
      { text: "Set up a Sensitive Data Scanner rule yourself, then break it on purpose to recognize a misconfigured one later.", link: { url: "https://docs.datadoghq.com/security/sensitive_data_scanner/setup/telemetry_data/", label: "Set Up Sensitive Data Scanner for Telemetry Data" } },
    ]},
    { title: "Cloud", items: [
      { text: "Handle onboarding tickets for two different cloud providers back to back, so you feel the differences instead of reading about them." },
      { text: "Get fast at reading an IAM permission error and naming the missing permission without guessing.", link: { url: "https://docs.datadoghq.com/integrations/amazon-web-services/", label: "Amazon Web Services integration" } },
    ]},
    { title: "Containers", items: [
      { text: "Deliberately break an Autodiscovery/annotation config in your sandbox so you recognize the symptom later on a ticket.", link: { url: "https://docs.datadoghq.com/containers/kubernetes/integrations/", label: "Kubernetes and Integrations" } },
      { text: "Understand exactly what the Admission Controller injects into a pod, and why APM instrumentation silently fails without it.", link: { url: "https://docs.datadoghq.com/containers/cluster_agent/admission_controller/", label: "Datadog Admission Controller" } },
      { text: "Find the common failure points in Helm-based Agent deployments before a customer finds them for you.", link: { url: "https://docs.datadoghq.com/containers/kubernetes/installation/", label: "Install the Datadog Agent on Kubernetes" } },
    ]},
    { title: "Networking", items: [
      { text: "Debug an Agent connectivity issue end to end — proxy, firewall, DNS — using the same \"prove it from inside the container\" instinct from the 404 story.", link: { url: "https://docs.datadoghq.com/agent/troubleshooting/", label: "Agent Troubleshooting" } },
      { text: "Get comfortable with the SNMP polling model behind NDM, not just the dashboard it produces.", link: { url: "https://docs.datadoghq.com/network_monitoring/devices/setup/", label: "NDM Setup" } },
      { text: "Understand what actually causes a Synthetic network test to fail versus a genuine outage.", link: { url: "https://docs.datadoghq.com/synthetics/api_tests/tcp_tests/", label: "TCP Testing" } },
    ]},
  ]},
  { phase: "Days 60-90 — depth and specialization", categories: [
    { title: "General", items: [
      { text: "Ask your manager directly what stands between you and TSE2 scope — don't wait for a review cycle to surface it." },
      { text: "Notice which product area teammates start pulling you into by name — that's your specialty announcing itself." },
    ]},
    { title: "Security", items: [
      { text: "Become the go-to for one specific security product area — pick one and go deeper than the ticket queue requires." },
      { text: "Understand Workload Protection's runtime detection model: eBPF on Linux, and what happens where eBPF isn't available.", link: { url: "https://learn.datadoghq.com/courses/workload-protection-enable-manage", label: "Course: Enable and Manage Workload Protection" } },
    ]},
    { title: "Cloud", items: [
      { text: "Understand precisely how resource collection differs between Agentless Scanning and Agent-based collection, and when you'd recommend one over the other.", link: { url: "https://docs.datadoghq.com/security/cloud_security_management/setup/", label: "Setting up Cloud Security" } },
    ]},
    { title: "Containers", items: [
      { text: "Get comfortable debugging Kubernetes State metrics without looking up what kube-state-metrics is every time.", link: { url: "https://docs.datadoghq.com/integrations/kubernetes_state_core/", label: "Kubernetes State Core" } },
      { text: "Understand Cluster Checks and the Cluster Checks Runner architecture well enough to explain why some checks can't just run on the node Agent.", link: { url: "https://docs.datadoghq.com/containers/cluster_agent/clusterchecks/", label: "Cluster Checks" } },
    ]},
    { title: "Networking", items: [
      { text: "Confidently trace a full path issue from client through the Agent to intake to backend — same instinct as the 404 investigation, just at a bigger scale." },
      { text: "Turn a networking ticket you debugged into a KB article — it's usually the thinnest-covered area, so it's an easy way to stand out." },
    ]},
  ]},
];

const AREAS = [
  { key: "security", label: "Security" },
  { key: "cloud", label: "Cloud" },
  { key: "containers", label: "Containers" },
  { key: "networking", label: "Networking" },
  { key: "other", label: "Other" },
];

const ISSUE_TYPES = {
  security: ["CSPM finding / misconfig", "CWS detection issue", "Sensitive Data Scanner config", "IAM/permission for security product", "False positive"],
  cloud: ["Integration setup/onboarding", "IAM/permission error", "Data not collecting", "Cost/resource collection", "Multi-account/org config"],
  containers: ["Agent DaemonSet deployment", "Autodiscovery/annotations", "Cluster Agent issue", "Admission Controller/APM injection", "Helm chart config"],
  networking: ["Agent connectivity (proxy/firewall)", "DNS resolution", "NPM data missing", "NDM/SNMP polling", "Synthetics network test failure"],
  other: ["General product question", "UI/dashboard issue", "Billing/account question", "Bug report"],
};

const OUTCOMES = ["Resolved - config/user error", "Resolved - known bug", "Escalated", "Docs/KB gap found", "Still investigating"];

let checkedState = {};
let entries = [];
let selected = { area: null, issue: null, outcome: null };

const statusEl = document.getElementById("status");
const statusText = document.getElementById("status-text");
const banner = document.getElementById("storage-banner");

function setStatus(ok, text){
  statusEl.className = "status " + (ok ? "ok" : "bad");
  statusText.textContent = text;
  banner.classList.toggle("show", !ok);
}

async function api(path, options){
  try {
    const res = await fetch(path, options);
    if (!res.ok) throw new Error("HTTP " + res.status);
    setStatus(true, "Connected");
    return await res.json();
  } catch (err) {
    setStatus(false, "Server unreachable");
    console.error("API call failed:", path, err);
    throw err;
  }
}

function itemKey(pi, ci, ii){ return pi+"-"+ci+"-"+ii; }

function escapeHtml(s){
  const d = document.createElement("div");
  d.textContent = s || "";
  return d.innerHTML;
}

function renderPlan(){
  const body = document.getElementById("plan-body");
  body.innerHTML = "";
  let total = 0, done = 0;
  PLAN.forEach((phase, pi) => {
    const phaseEl = document.createElement("div");
    phaseEl.className = "phase";
    const head = document.createElement("div");
    head.className = "phase-head";
    head.innerHTML = `<h2>${phase.phase}</h2>`;
    phaseEl.appendChild(head);
    phase.categories.forEach((cat, ci) => {
      const catEl = document.createElement("div");
      catEl.className = "category";
      const title = document.createElement("p");
      title.className = "category-title";
      title.textContent = cat.title;
      catEl.appendChild(title);
      cat.items.forEach((item, ii) => {
        total++;
        const key = itemKey(pi, ci, ii);
        const isDone = !!checkedState[key];
        if (isDone) done++;
        const row = document.createElement("label");
        row.className = "item" + (isDone ? " done" : "");
        const linkHtml = item.link
          ? ` <a href="${item.link.url}" target="_blank" rel="noopener" class="task-link" onclick="event.stopPropagation()">${escapeHtml(item.link.label)} ↗</a>`
          : "";
        row.innerHTML = `<input type="checkbox" ${isDone ? "checked" : ""} data-key="${key}"><span>${escapeHtml(item.text)}${linkHtml}</span>`;
        catEl.appendChild(row);
      });
      phaseEl.appendChild(catEl);
    });
    body.appendChild(phaseEl);
  });
  document.getElementById("progress-label").textContent = done + " / " + total;
  document.getElementById("progress-fill").style.width = (total ? (done/total*100) : 0) + "%";

  body.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", async (e) => {
      const key = e.target.dataset.key;
      const wasChecked = checkedState[key];
      checkedState[key] = e.target.checked;
      renderPlan();
      try {
        await api("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, done: e.target.checked }),
        });
      } catch (err) {
        checkedState[key] = wasChecked; // roll back on failure
        renderPlan();
      }
    });
  });
}

function renderStats(){
  const row = document.getElementById("stats-row");
  const counts = {};
  entries.forEach(e => counts[e.area] = (counts[e.area]||0)+1);
  row.innerHTML = "";
  if (entries.length === 0) return;
  AREAS.forEach(a => {
    if (!counts[a.key]) return;
    const el = document.createElement("div");
    el.className = "stat";
    el.innerHTML = `<b>${counts[a.key]}</b>${a.label}`;
    row.appendChild(el);
  });
}

function renderLog(){
  renderStats();
  const body = document.getElementById("log-body");
  document.getElementById("log-count").textContent = entries.length + (entries.length === 1 ? " entry" : " entries");
  body.innerHTML = "";
  if (entries.length === 0){
    body.innerHTML = '<div class="empty">No tickets logged yet. Add one after your next tricky ticket.</div>';
    return;
  }
  entries.forEach(entry => {
    const el = document.createElement("div");
    el.className = "entry";
    const areaLabel = (AREAS.find(a => a.key === entry.area) || {label:"Other"}).label;
    el.innerHTML = `
      <div class="entry-head">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="entry-ref">${escapeHtml(entry.ref || "(no ref)")}</span>
          <span class="pill ${entry.area}">${areaLabel}</span>
          ${entry.issue ? `<span class="pill">${escapeHtml(entry.issue)}</span>` : ""}
          ${entry.outcome ? `<span class="pill">${escapeHtml(entry.outcome)}</span>` : ""}
        </div>
        <span class="entry-date">${entry.created_at}</span>
      </div>
      ${entry.notes ? `<div class="entry-body"><p>${escapeHtml(entry.notes)}</p></div>` : ""}
      <div class="entry-actions">
        <button data-id="${entry.id}" class="del-btn">Delete</button>
      </div>
    `;
    body.appendChild(el);
  });
  body.querySelectorAll(".del-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      try {
        await api("/api/tickets/" + btn.dataset.id, { method: "DELETE" });
        entries = entries.filter(e => e.id !== btn.dataset.id);
        renderLog();
      } catch (err) { /* status already shown */ }
    });
  });
}

function renderChips(){
  const areaRow = document.getElementById("chips-area");
  areaRow.innerHTML = "";
  AREAS.forEach(a => {
    const c = document.createElement("div");
    c.className = "chip" + (selected.area === a.key ? " selected" : "");
    c.textContent = a.label;
    c.addEventListener("click", () => {
      selected.area = a.key;
      selected.issue = null;
      renderChips();
    });
    areaRow.appendChild(c);
  });

  const issueLabel = document.getElementById("issue-label");
  const issueRow = document.getElementById("chips-issue");
  issueRow.innerHTML = "";
  if (selected.area && ISSUE_TYPES[selected.area]){
    issueLabel.style.display = "block";
    ISSUE_TYPES[selected.area].forEach(text => {
      const c = document.createElement("div");
      c.className = "chip" + (selected.issue === text ? " selected" : "");
      c.textContent = text;
      c.addEventListener("click", () => {
        selected.issue = (selected.issue === text) ? null : text;
        renderChips();
      });
      issueRow.appendChild(c);
    });
  } else {
    issueLabel.style.display = "none";
  }

  const outcomeRow = document.getElementById("chips-outcome");
  outcomeRow.innerHTML = "";
  OUTCOMES.forEach(text => {
    const c = document.createElement("div");
    c.className = "chip outcome" + (selected.outcome === text ? " selected" : "");
    c.textContent = text;
    c.addEventListener("click", () => {
      selected.outcome = (selected.outcome === text) ? null : text;
      renderChips();
    });
    outcomeRow.appendChild(c);
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
  });
});

const form = document.getElementById("log-form");
document.getElementById("new-entry-btn").addEventListener("click", () => {
  form.classList.add("open");
  renderChips();
});
document.getElementById("cancel-entry-btn").addEventListener("click", () => {
  form.classList.remove("open");
  clearForm();
});
document.getElementById("save-entry-btn").addEventListener("click", async () => {
  const ref = document.getElementById("f-ref").value.trim();
  const errEl = document.getElementById("form-err");
  if (!ref || !selected.area){
    errEl.style.display = "block";
    return;
  }
  errEl.style.display = "none";
  try {
    const entry = await api("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref,
        area: selected.area,
        issue: selected.issue || "",
        outcome: selected.outcome || "",
        notes: document.getElementById("f-notes").value.trim(),
      }),
    });
    entries.unshift(entry);
    renderLog();
    clearForm();
    form.classList.remove("open");
  } catch (err) { /* status already shown, keep form open so nothing is lost */ }
});

function clearForm(){
  document.getElementById("f-ref").value = "";
  document.getElementById("f-notes").value = "";
  selected = { area: null, issue: null, outcome: null };
  document.getElementById("form-err").style.display = "none";
}

function downloadJson(obj, filename){
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById("export-btn").addEventListener("click", async () => {
  try {
    const data = await api("/api/export");
    downloadJson(data, "tse1-tracker-backup.json");
  } catch (err) { /* status already shown */ }
});

document.getElementById("import-btn").addEventListener("click", () => {
  document.getElementById("import-file").click();
});
document.getElementById("import-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    await api("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await loadAll();
  } catch (err) {
    alert("Couldn't import that file — make sure it's a backup exported from this tool.");
  }
  e.target.value = "";
});

async function loadAll(){
  try {
    checkedState = await api("/api/progress");
    entries = await api("/api/tickets");
  } catch (err) {
    checkedState = checkedState || {};
    entries = entries || [];
  }
  renderPlan();
  renderLog();
}

loadAll();
