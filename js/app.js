const form = document.getElementById("health-form");
const scoreEl = document.getElementById("score");
const detailsEl = document.getElementById("details");
const scoreLabelEl = document.getElementById("score-label");
const overallBarFill = document.getElementById("overall-bar-fill");
const copyBtn = document.getElementById("copy-summary-btn");
const copyStatusEl = document.getElementById("copy-status");
const ctaEl = document.getElementById("cta");
const ctaTextEl = document.getElementById("cta-text");

// For nicer labels & summary text
const categoryLabels = {
  capacity: "Capacity",
  availability: "Availability",
  monitoring: "Monitoring",
  performance: "Performance",
  security: "Security"
};

let lastOverallScore = null;
let lastRating = null;
let lastCategoryScores = {};

function getRating(score) {
  if (score >= 85) {
    return {
      label: "Resilient",
      text: "Strong reliability posture. Focus on fine-tuning and continuous improvement."
    };
  } else if (score >= 70) {
    return {
      label: "Healthy",
      text: "Solid foundation. Address medium-risk gaps to reach a resilient state."
    };
  } else if (score >= 40) {
    return {
      label: "Needs Improvement",
      text: "There are real reliability risks. Use low-scoring areas as your roadmap."
    };
  } else {
    return {
      label: "At Risk",
      text: "High risk of incidents and outages. Prioritize quick wins in availability, monitoring, and backups."
    };
  }
}

function barClass(score) {
  if (score >= 70) return "bar-good";
  if (score >= 40) return "bar-medium";
  return "bar-low";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const selects = form.querySelectorAll("select[data-category]");
  const totals = {};
  const counts = {};

  selects.forEach(select => {
    const cat = select.dataset.category;
    const val = parseInt(select.value, 10);

    if (!totals[cat]) {
      totals[cat] = 0;
      counts[cat] = 0;
    }

    totals[cat] += val;
    counts[cat] += 1;
  });

  let catScores = {};
  let combined = 0;
  let catCount = 0;

  Object.keys(totals).forEach(cat => {
    const max = counts[cat] * 3;   // 3 = max per question
    const pct = Math.round((totals[cat] / max) * 100);

    catScores[cat] = pct;
    combined += pct;
    catCount += 1;
  });

  const overall = Math.round(combined / catCount);

  // Persist values for copy summary & CTA
  lastOverallScore = overall;
  lastCategoryScores = catScores;

  // Update overall score text
  scoreEl.textContent = overall + "%";

  // Update overall bar
  overallBarFill.style.width = overall + "%";
  overallBarFill.classList.remove("bar-low", "bar-medium", "bar-good");
  overallBarFill.classList.add(barClass(overall));

  // Label + description
  const rating = getRating(overall);
  lastRating = rating.label; // keep just the label for summary
  scoreLabelEl.innerHTML = `<strong>${rating.label}</strong> – ${rating.text}`;

  // Build category breakdown with bars
  let html = "<h3>Quick View by Area</h3>";

  Object.keys(catScores).forEach(cat => {
    const value = catScores[cat];
    const cls = barClass(value);
    const label = categoryLabels[cat] || cat;

    html += `
      <div class="category-row">
        <div class="category-title">
          <span class="label">${label}</span>
          <span class="value">${value}%</span>
        </div>
        <div class="bar">
          <div class="bar-fill ${cls}" style="width: ${value}%"></div>
        </div>
      </div>
    `;
  });

  detailsEl.innerHTML = html;
  copyStatusEl.textContent = ""; // clear any old status

  // --- CTA logic: show lowest area + invite to book a call ---
  let lowestCat = null;
  let lowestScore = 101;

  Object.keys(catScores).forEach(cat => {
    if (catScores[cat] < lowestScore) {
      lowestScore = catScores[cat];
      lowestCat = cat;
    }
  });

  const lowestLabel = lowestCat ? categoryLabels[lowestCat] : "your database reliability";

  ctaTextEl.textContent = `Your current DB health is ${overall}% (${rating.label}). A focused working session can quickly improve ${lowestLabel} and give you a concrete reliability roadmap for the next 90 days.`;
  ctaEl.classList.remove("hidden");
});

// Copy summary handler
copyBtn.addEventListener("click", async () => {
  if (lastOverallScore === null || !Object.keys(lastCategoryScores).length) {
    copyStatusEl.textContent = "Calculate your DB health first.";
    return;
  }

  const lines = [];
  lines.push("Database Reliability Health Snapshot");
  lines.push(`Overall: ${lastOverallScore}% (${lastRating})`);
  lines.push("");

  Object.keys(categoryLabels).forEach(cat => {
    const label = categoryLabels[cat];
    const value = lastCategoryScores[cat] ?? 0;
    lines.push(`${label}: ${value}%`);
  });

  lines.push("");
  lines.push("Book a call: https://rkkoranteng.com/contact");

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