const {
  brand,
  i18n,
  exams,
  pageSeeds,
  pageSections,
  sources,
  tools,
  calculateExamBudget,
  recommendExamPath,
} = window.ExamSiteData;

document.title = `${brand.name} | ${brand.tagline}`;

const state = {
  category: "All",
  locale: "en",
  search: "",
  examLimit: 18,
};

const EXAM_PAGE_SIZE = 18;

const $ = (selector) => document.querySelector(selector);
const t = () => i18n[state.locale];
const esc = (str) => String(str).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Inline SVG icon set (no external requests)
const ICONS = {
  cert: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="M9 13.5 8 22l4-2 4 2-1-8.5"/></svg>',
  route: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M6 8.5v4a5 5 0 0 0 5 5h2"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  library: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 4v16"/></svg>',
  source: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>',
  tools: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/></svg>',
};

function renderStaticText() {
  const copy = t();
  document.documentElement.lang = copy.lang;
  document.title = copy.title;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (copy[key]) element.setAttribute("placeholder", copy[key]);
  });
  $("#language-toggle").textContent = copy.languageToggle;
}

function renderStats() {
  $("#exam-count").textContent = exams.length;
  $("#page-count").textContent = pageSeeds.length;
  $("#source-count").textContent = sources.length;
}

function renderCategoryTabs() {
  const categories = ["All", ...new Set(exams.map((exam) => exam.category))];
  $("#category-tabs").innerHTML = categories
    .map(
      (category) =>
        `<button class="tab${category === state.category ? " is-active" : ""}" data-category="${category}">${categoryLabel(category)}</button>`
    )
    .join("");
}

function categoryLabel(category) {
  if (category === "All") return t().all;
  if (state.locale === "en") return category;
  const labels = {
    "Language Visa": "签证语言",
    "Medical Language": "医疗语言",
    Nursing: "护理",
    Interpreter: "口译",
    "State License": "州级执照",
    "Healthcare Entry": "医疗入门",
    Medicine: "医学",
  };
  return labels[category] || category;
}

function filteredExams() {
  const term = state.search.toLowerCase();
  return exams.filter((exam) => {
    const inCategory = state.category === "All" || exam.category === state.category;
    const haystack = `${exam.name} ${exam.country} ${exam.language} ${exam.intent} ${exam.monetization}`.toLowerCase();
    return inCategory && (!term || haystack.includes(term));
  });
}

function renderExamTable() {
  const all = filteredExams();
  const visible = all.slice(0, state.examLimit);
  const rows = visible
    .map(
      (exam) => `<tr>
        <td><strong>${esc(exam.name)}</strong><span>${esc(exam.intent)}</span></td>
        <td>${esc(exam.country)}<span>${esc(exam.language)}</span></td>
        <td>${esc(exam.demand)}</td>
        <td>${esc(exam.monetization)}</td>
        <td><a href="${esc(exam.officialUrl)}" target="_blank" rel="noreferrer">${esc(exam.officialSource)}</a><span>${esc(exam.lastUpdated)}</span></td>
      </tr>`
    )
    .join("");
  const more = all.length - state.examLimit;
  const moreRow =
    more > 0
      ? `<tr class="show-more-row"><td colspan="5"><button class="show-more-btn" id="show-more-btn" type="button">${
          t().showMore || "Show more"
        } (${more})</button></td></tr>`
      : "";
  $("#exam-table").innerHTML = rows + moreRow;
  $("#visible-count").textContent = all.length;

  const btn = $("#show-more-btn");
  if (btn) btn.addEventListener("click", () => {
    state.examLimit += EXAM_PAGE_SIZE;
    renderExamTable();
  });
}

function renderPageTemplate() {
  const sections = t().pageSections || pageSections;
  $("#page-sections").innerHTML = sections.map((section) => `<li>${section}</li>`).join("");
}

function renderTools() {
  const visibleTools = t().tools || tools;
  $("#tool-list").innerHTML = visibleTools
    .map(
      (tool) => `<article class="tool-card">
        <h3>${esc(tool.name)}</h3>
        <p>${esc(tool.promise)}</p>
        <span>${esc(tool.conversion)}</span>
      </article>`
    )
    .join("");
}

function renderSources() {
  $("#source-list").innerHTML = sources
    .map((source) => {
      const badge = esc((source.name || "?").trim().charAt(0).toUpperCase());
      return `<li>
        <span class="source-badge" aria-hidden="true">${badge}</span>
        <span>
          <a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.name)}</a>
          <span>${esc(source.use)}</span>
        </span>
      </li>`;
    })
    .join("");
}

function renderBudget() {
  const result = calculateExamBudget({
    examFee: $("#exam-fee").value,
    prepBudget: $("#prep-budget").value,
    retakes: $("#retakes").value,
  });
  $("#budget-result").textContent = `$${result.total.toLocaleString("en-US")}`;
  const copy = t();
  $("#budget-note").innerHTML = `${esc(copy.budgetNote(result))}<span class="compliance-note">${esc(copy.budgetDisclaimer || "")}</span>`;
}

function renderPath() {
  const result = recommendExamPath({
    goal: $("#goal").value,
    country: $("#country").value,
    language: $("#language").value,
  }, state.locale);
  $("#path-result").innerHTML = `
    <strong>${esc(result.primaryExam)}</strong>
    <ol>${result.nextSteps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>
    <p>${esc(result.warning)}</p>
  `;
}

function renderAiMock() {
  const exam = $("#mock-exam").value.trim() || "Goethe-Zertifikat A1";
  const skill = $("#mock-skill").value;
  $("#mock-result").innerHTML = t().mockResult(exam, skill);
}

function renderTrustIcons() {
  const strip = document.querySelector(".trust-strip");
  if (!strip) return;
  const icons = [ICONS.cert, ICONS.route, ICONS.shield];
  strip.querySelectorAll(".trust-icon").forEach((node, i) => {
    if (icons[i]) node.innerHTML = icons[i];
  });
}

function bindEvents() {
  $("#category-tabs").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    state.category = event.target.dataset.category;
    state.examLimit = EXAM_PAGE_SIZE;
    renderCategoryTabs();
    renderExamTable();
  });

  $("#search").addEventListener("input", (event) => {
    state.search = event.target.value;
    state.examLimit = EXAM_PAGE_SIZE;
    renderExamTable();
  });

  ["exam-fee", "prep-budget", "retakes"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderBudget);
  });

  ["goal", "country", "language"].forEach((id) => {
    $(`#${id}`).addEventListener("change", renderPath);
  });

  ["mock-exam", "mock-skill"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderAiMock);
    $(`#${id}`).addEventListener("change", renderAiMock);
  });

  $("#language-toggle").addEventListener("click", () => {
    state.locale = state.locale === "en" ? "zh" : "en";
    renderAll();
  });

  $("#waitlist-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value.trim();
    const copy = t();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      $("#waitlist-message").textContent = copy.waitlistError || "Please enter a valid email.";
      return;
    }
    const action = form.getAttribute("action") || "";
    const btn = form.querySelector("button[type=submit]");
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = copy.waitlistSending || "Sending…";
    $("#waitlist-message").textContent = "";

    // If the Formspree endpoint is not yet configured (placeholder still in action),
    // fall back to the demo success message instead of hitting an invalid URL.
    if (!action || action.includes("YOUR_FORM_ID")) {
      $("#waitlist-message").textContent = copy.waitlistSuccess;
      form.reset();
      btn.disabled = false;
      btn.textContent = originalLabel;
      return;
    }

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        $("#waitlist-message").textContent = copy.waitlistSuccess;
        form.reset();
      } else {
        $("#waitlist-message").textContent = copy.waitlistError;
      }
    } catch (err) {
      $("#waitlist-message").textContent = copy.waitlistError;
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
}

function renderAll() {
  renderStaticText();
  renderStats();
  renderCategoryTabs();
  renderExamTable();
  renderPageTemplate();
  renderTools();
  renderSources();
  renderBudget();
  renderPath();
  renderAiMock();
  renderTrustIcons();
  $("#waitlist-message").textContent = "";
}

function init() {
  renderAll();
  bindEvents();
}

init();
