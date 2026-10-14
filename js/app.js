// Config
const MAX_SCORE_PER_QUESTION = 3;
const BOOKING_URL = "https://rkkoranteng.com/Contact.html";

// Scorecards. Each is scored separately: area score = points / max points,
// overall score = average of the area scores. Options are listed from 0 to 3 points.
const SCORECARDS = {
  agility: {
    title: "Environment Agility",
    intro: "Can you rebuild a production-like database environment quickly, with minimal manual intervention?",
    areas: [
      {
        key: "version-control",
        label: "Version Control",
        questions: [
          { q: "Where do schema definitions live?", options: ["Nowhere", "Shared drive", "Git, partially", "Git, everything"] },
          { q: "Is database configuration (parameters, users, jobs) in version control?", options: ["No", "Some", "Most", "All"] },
          { q: "Are changes reviewed before reaching production?", options: ["No", "Informally", "Pull requests", "Pull requests + automated checks"] }
        ]
      },
      {
        key: "provisioning",
        label: "Automated Provisioning",
        questions: [
          { q: "How is a new database created?", options: ["Ticket + manual work", "Scripts", "Infrastructure as code", "Self-service"] },
          { q: "How are users, roles, and grants created?", options: ["Manually", "Scripts", "Mostly code", "Fully code"] },
          { q: "How are networking, backups, and monitoring set up for a new database?", options: ["Manually", "Partly scripted", "Mostly code", "All code, with the database"] }
        ]
      },
      {
        key: "change-delivery",
        label: "Change Delivery",
        questions: [
          { q: "How do schema changes reach production?", options: ["Run by hand", "Scripted", "Pipeline", "Pipeline + automated rollback"] },
          { q: "Are migrations tested before production?", options: ["No", "Manually", "In the pipeline", "In the pipeline, on prod-like data"] },
          { q: "How often can you release database changes?", options: ["Quarterly or less", "Monthly", "Weekly", "On demand"] }
        ]
      },
      {
        key: "parity",
        label: "Environment Parity",
        questions: [
          { q: "How closely do lower environments match production?", options: ["Drifted", "Rebuilt sometimes", "Rebuilt from code", "Rebuilt every release"] },
          { q: "How do you get test data?", options: ["Copy of production", "Hand-made", "Masked subset", "Automated masked refresh"] },
          { q: "How is drift between environments detected?", options: ["Not detected", "Found during releases", "Checked periodically", "Detected automatically"] }
        ]
      },
      {
        key: "rebuild",
        label: "Rebuild Speed",
        questions: [
          { q: "How long does it take to rebuild a production-like environment?", options: ["Weeks", "Days", "Hours", "Minutes"] },
          { q: "How many manual steps does a rebuild take?", options: ["Many, undocumented", "Many, documented", "A few", "None"] },
          { q: "Who can run a rebuild?", options: ["Specialists only", "One specific DBA", "Anyone on the team", "Anyone, self-service"] }
        ]
      }
    ]
  },

  operations: {
    title: "Operations",
    intro: "Will your databases stay up, perform well, and come back when something breaks?",
    areas: [
      {
        key: "capacity",
        label: "Capacity",
        questions: [
          { q: "How do you forecast storage and growth?", options: ["No forecasting", "Some visibility", "Good coverage", "Full forecasting"] },
          { q: "How do you track CPU and I/O usage?", options: ["No CPU/IO tracking", "Basic tracking", "Regular tracking", "Continuous monitoring"] },
          { q: "How do you plan for scaling?", options: ["No scale strategy", "Basic plan", "Documented", "Documented + tested"] }
        ]
      },
      {
        key: "availability",
        label: "Availability",
        questions: [
          { q: "Do you have high availability (replicas or clustering)?", options: ["None", "Manual standby", "Automatic failover", "Automatic failover, multi-zone"] },
          { q: "How often is failover tested?", options: ["Never", "Ad hoc", "Annually", "On a regular schedule"] },
          { q: "Do patches and maintenance require downtime?", options: ["Requires downtime", "Some downtime", "Minimal downtime", "Zero-downtime"] }
        ]
      },
      {
        key: "performance",
        label: "Performance",
        questions: [
          { q: "How much visibility do you have into slow queries?", options: ["No visibility", "During issues", "Periodic review", "Continuous"] },
          { q: "How do you manage indexes?", options: ["No index strategy", "Basic", "Semi-automated", "Automated"] },
          { q: "Do you track wait events?", options: ["No wait tracking", "During issues", "Regular", "Structured"] }
        ]
      },
      {
        key: "recoverability",
        label: "Recoverability",
        questions: [
          { q: "Are recovery point and time objectives (RPO/RTO) defined?", options: ["No RPO/RTO", "Basic", "Defined", "Reviewed"] },
          { q: "How often are restores and disaster recovery tested?", options: ["Never tested", "Old test", "Tested annually", "Regular DR tests"] },
          { q: "How are backups monitored?", options: ["Not monitored", "Checked manually", "Alert on failure", "Alerts + automated restore checks"] }
        ]
      },
      {
        key: "observability",
        label: "Observability",
        questions: [
          { q: "How complete is your database monitoring?", options: ["Minimal", "Basic", "Good", "Comprehensive"] },
          { q: "How well tuned are your alerts?", options: ["Noisy alerts", "Some tuned", "Mostly tuned", "Well-tuned"] },
          { q: "How quickly can you find the root cause of an incident?", options: ["Slow RCA", "Improving", "Usually OK", "Strong RCA"] }
        ]
      }
    ]
  },

  security: {
    title: "Security",
    intro: "How well are your databases and the data in them protected?",
    areas: [
      {
        key: "access",
        label: "Access Control",
        questions: [
          { q: "How is database access controlled?", options: ["Wide open", "Some control", "Role-based (RBAC)", "Least-privilege enforced"] },
          { q: "How are privileged (admin) accounts managed?", options: ["Shared admin logins", "Named admin accounts", "Named accounts + MFA", "Just-in-time access"] },
          { q: "How often is access reviewed?", options: ["Never", "Ad hoc", "Annually", "Quarterly or automated"] }
        ]
      },
      {
        key: "data-protection",
        label: "Data Protection",
        questions: [
          { q: "Is data encrypted at rest and in transit?", options: ["No encryption", "Partial", "Full", "Full + validated"] },
          { q: "How are encryption keys managed?", options: ["Not managed", "Stored with the data", "Key management service", "Key management + rotation"] },
          { q: "Is sensitive data masked outside production?", options: ["Production copies used as-is", "Some masking", "Masked by default", "Masked automatically"] }
        ]
      },
      {
        key: "auditing",
        label: "Auditing",
        questions: [
          { q: "Is database activity audited?", options: ["No auditing", "Minimal", "Good", "Full auditing"] },
          { q: "Where are audit logs kept?", options: ["Not kept", "On the database server", "Centralized", "Centralized + tamper-proof"] },
          { q: "Are audit logs reviewed?", options: ["Never", "After incidents", "Periodically", "Automated alerting"] }
        ]
      },
      {
        key: "hardening",
        label: "Hardening & Patching",
        questions: [
          { q: "How current are database patches?", options: ["Unknown", "Patched yearly", "Patched quarterly", "Within SLA, automated"] },
          { q: "Do you use a configuration baseline (such as CIS)?", options: ["None", "Informal", "Documented", "Enforced automatically"] },
          { q: "Do you scan for vulnerabilities?", options: ["Never", "Ad hoc", "Scheduled", "Continuous"] }
        ]
      },
      {
        key: "secrets",
        label: "Secrets Management",
        questions: [
          { q: "Where do application database passwords live?", options: ["In code", "Config files", "A secrets vault", "Vault + automatic rotation"] },
          { q: "How are database credentials rotated?", options: ["Never", "Manually, when needed", "On a schedule", "Automatically"] },
          { q: "Do applications share database accounts?", options: ["One shared account", "Some shared", "One per application", "One per application, least privilege"] }
        ]
      }
    ]
  }
};

const tabButtons = document.querySelectorAll("[role=tab]");
const introEl = document.getElementById("scorecard-intro");
const form = document.getElementById("health-form");
const questionsEl = document.getElementById("questions");
const resultsEl = document.getElementById("results");
const scoreTitleEl = document.getElementById("score-title");
const scoreEl = document.getElementById("score");
const detailsEl = document.getElementById("details");
const scoreLabelEl = document.getElementById("score-label");
const overallBarFill = document.getElementById("overall-bar-fill");
const copyBtn = document.getElementById("copy-summary-btn");
const copyStatusEl = document.getElementById("copy-status");
const ctaEl = document.getElementById("cta");
const ctaTextEl = document.getElementById("cta-text");

let activeKey = null;
let lastOverallScore = null;
let lastRating = null;
let lastAreaScores = {};

function getRating(score) {
  if (score >= 85) {
    return {
      label: "Resilient",
      text: "Strong posture. Focus on fine-tuning and continuous improvement."
    };
  } else if (score >= 70) {
    return {
      label: "Healthy",
      text: "Solid foundation. Address medium-risk gaps to reach a resilient state."
    };
  } else if (score >= 40) {
    return {
      label: "Needs Improvement",
      text: "There are real risks. Use low-scoring areas as your roadmap."
    };
  } else {
    return {
      label: "At Risk",
      text: "High risk of incidents. Prioritize quick wins in your lowest-scoring areas."
    };
  }
}

function barClass(score) {
  if (score >= 70) return "bar-good";
  if (score >= 40) return "bar-medium";
  return "bar-low";
}

function resetResults() {
  lastOverallScore = null;
  lastRating = null;
  lastAreaScores = {};
  scoreEl.textContent = "—";
  scoreLabelEl.innerHTML = "Answer the questions and click <strong>Calculate score</strong> to see results.";
  overallBarFill.style.width = "0";
  overallBarFill.classList.remove("bar-low", "bar-medium", "bar-good");
  detailsEl.innerHTML = "";
  copyStatusEl.textContent = "";
  ctaEl.classList.add("hidden");
}

function renderQuestions(card) {
  questionsEl.innerHTML = "";
  card.areas.forEach(area => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "card category";

    const legend = document.createElement("legend");
    legend.textContent = area.label;
    fieldset.appendChild(legend);

    area.questions.forEach(question => {
      const label = document.createElement("label");
      label.className = "question";

      const text = document.createElement("span");
      text.textContent = question.q;
      label.appendChild(text);

      const select = document.createElement("select");
      select.dataset.area = area.key;
      question.options.forEach((option, points) => {
        select.add(new Option(option, String(points)));
      });
      label.appendChild(select);

      fieldset.appendChild(label);
    });

    questionsEl.appendChild(fieldset);
  });
}

function showScorecard(key) {
  if (!SCORECARDS[key]) key = "agility";
  activeKey = key;
  const card = SCORECARDS[key];

  tabButtons.forEach(btn => {
    const selected = btn.dataset.scorecard === key;
    btn.setAttribute("aria-selected", String(selected));
    btn.tabIndex = selected ? 0 : -1;
    if (selected) form.setAttribute("aria-labelledby", btn.id);
  });

  introEl.textContent = card.intro;
  scoreTitleEl.textContent = card.title + " score";
  renderQuestions(card);
  resetResults();
}

// Tabs: click, arrow keys, and #agility / #operations / #security links
tabButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    history.replaceState(null, "", "#" + btn.dataset.scorecard);
    showScorecard(btn.dataset.scorecard);
  });

  btn.addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = tabButtons[(i + step + tabButtons.length) % tabButtons.length];
    next.focus();
    next.click();
  });
});

window.addEventListener("hashchange", () => showScorecard(location.hash.slice(1)));
showScorecard(location.hash.slice(1));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const card = SCORECARDS[activeKey];
  const selects = form.querySelectorAll("select[data-area]");
  const totals = {};
  const counts = {};

  selects.forEach(select => {
    const area = select.dataset.area;
    totals[area] = (totals[area] || 0) + parseInt(select.value, 10);
    counts[area] = (counts[area] || 0) + 1;
  });

  const areaScores = {};
  let combined = 0;

  card.areas.forEach(area => {
    const max = counts[area.key] * MAX_SCORE_PER_QUESTION;
    const pct = max > 0 ? Math.round((totals[area.key] / max) * 100) : 0;
    areaScores[area.key] = pct;
    combined += pct;
  });

  const overall = Math.round(combined / card.areas.length);
  const rating = getRating(overall);

  // Persist values for copy summary
  lastOverallScore = overall;
  lastRating = rating.label;
  lastAreaScores = areaScores;

  scoreEl.textContent = overall + "%";
  overallBarFill.style.width = overall + "%";
  overallBarFill.classList.remove("bar-low", "bar-medium", "bar-good");
  overallBarFill.classList.add(barClass(overall));
  scoreLabelEl.innerHTML = `<strong>${rating.label}</strong> – ${rating.text}`;

  // Area breakdown with bars
  let html = "<h3>Quick View by Area</h3>";
  card.areas.forEach(area => {
    const value = areaScores[area.key];
    html += `
      <div class="category-row">
        <div class="category-title">
          <span class="label">${area.label}</span>
          <span class="value">${value}%</span>
        </div>
        <div class="bar">
          <div class="bar-fill ${barClass(value)}" style="width: ${value}%"></div>
        </div>
      </div>
    `;
  });
  detailsEl.innerHTML = html;
  copyStatusEl.textContent = "";

  // CTA: point at the lowest-scoring area
  const lowest = card.areas.reduce((low, area) =>
    areaScores[area.key] < areaScores[low.key] ? area : low
  );
  ctaTextEl.textContent = `Your ${card.title} score is ${overall}% (${rating.label}). A focused working session can quickly improve ${lowest.label} and give you a concrete roadmap for the next 90 days.`;
  ctaEl.classList.remove("hidden");

  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Copy summary handler
copyBtn.addEventListener("click", async () => {
  if (lastOverallScore === null) {
    copyStatusEl.textContent = "Calculate your score first.";
    return;
  }

  const card = SCORECARDS[activeKey];
  const lines = [];
  lines.push(`Database Ops Scorecard: ${card.title}`);
  lines.push(`Overall: ${lastOverallScore}% (${lastRating})`);
  lines.push("");
  card.areas.forEach(area => {
    lines.push(`${area.label}: ${lastAreaScores[area.key]}%`);
  });
  lines.push("");
  lines.push(`Book a call: ${BOOKING_URL}`);

  const summaryText = lines.join("\n");

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(summaryText);
    } else {
      // Fallback
      const temp = document.createElement("textarea");
      temp.value = summaryText;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }

    copyStatusEl.textContent = "Summary copied to clipboard.";
  } catch (err) {
    console.error(err);
    copyStatusEl.textContent = "Unable to copy. You can select and copy manually.";
  }

  // Clear status after a few seconds
  setTimeout(() => {
    copyStatusEl.textContent = "";
  }, 4000);
});

// Theme toggle, matching rkkoranteng.com (choice stays in this browser)
function currentTheme() {
  const set = document.documentElement.getAttribute("data-theme");
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.querySelectorAll(".theme-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
});

// Mobile nav
const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
if (siteHeader && navToggle) {
  navToggle.addEventListener("click", () => {
    const open = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// Footer year
document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});
