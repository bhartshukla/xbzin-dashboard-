/* ═══════════════════════════════════════════════════════════
   XBzin Ecosystem — Admin Dashboard
   script.js  |  Pure JS, Chart.js integration, UI logic
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────
   UTILITY: DOM helpers
──────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ────────────────────────────────────
   SIDEBAR TOGGLE
──────────────────────────────────── */
const sidebar      = $('#sidebar');
const mainWrapper  = $('#mainWrapper');
const menuToggle   = $('#menuToggle');
const sidebarClose = $('#sidebarClose');
const overlay      = $('#overlay');

let isMobile = () => window.innerWidth <= 768;

function openSidebar () {
  if (isMobile()) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  } else {
    // Desktop: toggle collapse
    sidebar.classList.toggle('collapsed');
    mainWrapper.classList.toggle('collapsed-layout');
  }
}

function closeSidebar () {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

menuToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Close on resize if opened in mobile
window.addEventListener('resize', () => {
  if (!isMobile()) closeSidebar();
});

/* ────────────────────────────────────
   ACTIVE NAV LINK + BREADCRUMB
──────────────────────────────────── */
const navLinks      = $$('.nav-link[data-section]');
const breadcrumbEl  = $('#breadcrumbActive');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    // Remove active from all
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Update breadcrumb
    const sectionName = this.querySelector('span').textContent;
    breadcrumbEl.textContent = sectionName;

    // Close sidebar on mobile after click
    if (isMobile()) closeSidebar();
  });
});

// Highlight nav based on scroll position
const sections = $$('section[id]');

function highlightNavOnScroll () {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
      breadcrumbEl.textContent = link.querySelector('span').textContent;
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

/* ────────────────────────────────────
   NOTIFICATION DROPDOWN
──────────────────────────────────── */
const notifBtn       = $('#notifBtn');
const notifDropdown  = $('#notifDropdown');

notifBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  notifDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  notifDropdown.classList.remove('open');
});

/* ────────────────────────────────────
   KPI COUNTER ANIMATION
──────────────────────────────────── */
function animateCounter (el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// Intersection observer — animate when visible
const counterEls = $$('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.count, 10));
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counterEls.forEach(el => counterObserver.observe(el));

/* ────────────────────────────────────
   CHART.JS — GLOBAL DEFAULTS
──────────────────────────────────── */
Chart.defaults.font.family = "'Poppins', sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#6b7280';
Chart.defaults.plugins.legend.display = false; // We use custom legends

/* ── Color palette for charts ── */
const C = {
  green:  '#22c55e',
  yellow: '#f5b800',
  red:    '#e84040',
  blue:   '#2563eb',
  black:  '#111111',
};

/* ────────────────────────────────────
   CHART 1: PROJECT STATUS — Doughnut
──────────────────────────────────── */
const projectCtx = $('#projectChart').getContext('2d');
new Chart(projectCtx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'Ongoing', 'Pending'],
    datasets: [{
      data: [129, 4, 9],
      backgroundColor: [C.green, C.yellow, C.red],
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverOffset: 8,
    }],
  },
  options: {
    cutout: '68%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} projects`,
        },
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        padding: 10,
        cornerRadius: 8,
      },
    },
    animation: {
      animateScale: true,
      duration: 1000,
    },
  },
});

/* ────────────────────────────────────
   CHART 2: FUNDING ROUNDS — Bar
──────────────────────────────────── */
const fundingCtx = $('#fundingChart').getContext('2d');
new Chart(fundingCtx, {
  type: 'bar',
  data: {
    labels: ['Round 1', 'Round 2'],
    datasets: [{
      label: 'Amount (₹ Lakhs)',
      data: [16, 19],
      backgroundColor: [C.blue, C.green],
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 60,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 25,
        ticks: {
          callback: (val) => `₹${val}L`,
          stepSize: 5,
        },
        grid: { color: '#f3f4f6' },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ₹${ctx.raw} Lakhs`,
        },
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        padding: 10,
        cornerRadius: 8,
      },
    },
    animation: { duration: 1000 },
  },
});

/* ────────────────────────────────────
   CHART 3: INVESTMENT vs FUND USAGE — Line
──────────────────────────────────── */
const investCtx = $('#investChart').getContext('2d');
new Chart(investCtx, {
  type: 'line',
  data: {
    labels: ['Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24', 'Q1 FY25'],
    datasets: [
      {
        label: 'Total Investment (₹L)',
        data: [10, 20, 30, 38, 43],
        borderColor: C.blue,
        backgroundColor: 'rgba(37,99,235,.08)',
        pointBackgroundColor: C.blue,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        borderWidth: 2.5,
      },
      {
        label: 'Fund Utilized (₹L)',
        data: [12, 28, 45, 62, 78],
        borderColor: C.red,
        backgroundColor: 'rgba(232,64,64,.06)',
        pointBackgroundColor: C.red,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        borderWidth: 2.5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { callback: (val) => `₹${val}L` },
        grid: { color: '#f3f4f6' },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ₹${ctx.raw}L`,
        },
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        padding: 10,
        cornerRadius: 8,
      },
    },
    animation: { duration: 1200 },
  },
});

/* ────────────────────────────────────
   CHART 4: PATENT STATUS — Pie
──────────────────────────────────── */
const patentCtx = $('#patentChart').getContext('2d');
new Chart(patentCtx, {
  type: 'pie',
  data: {
    labels: ['Granted', 'Pending'],
    datasets: [{
      data: [3, 1],
      backgroundColor: [C.green, C.yellow],
      borderColor: '#ffffff',
      borderWidth: 3,
      hoverOffset: 6,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} patent${ctx.raw > 1 ? 's' : ''}`,
        },
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        padding: 10,
        cornerRadius: 8,
      },
    },
    animation: { animateScale: true, duration: 1000 },
  },
});

/* ────────────────────────────────────
   SMOOTH SCROLL for anchor links
──────────────────────────────────── */
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const sectionId = this.dataset.section;
    const target = document.getElementById(sectionId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ────────────────────────────────────
   PROGRESS BARS — animate on scroll
──────────────────────────────────── */
const progressBars = $$('.proj-fill, .fund-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.style.width;
      bar.style.width = '0';
      // Trigger reflow then animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
          bar.style.width = target;
        });
      });
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

progressBars.forEach(bar => barObserver.observe(bar));

/* ────────────────────────────────────
   TOOLTIP on KPI cards (hover)
──────────────────────────────────── */
// Simple title tooltip enhancement — already handled by browser via title attribute
// We can add a subtle class toggle for the hover ring effect
const kpiCards = $$('.kpi-card');
kpiCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderLeftWidth = '4px';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderLeftWidth = '3px';
  });
});

/* ────────────────────────────────────
   ECO CARDS — subtle entrance animation
──────────────────────────────────── */
const ecoCards = $$('.eco-card, .patent-card, .fund-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(16px)';
      setTimeout(() => {
        entry.target.style.transition = 'opacity .4s ease, transform .4s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

ecoCards.forEach(card => cardObserver.observe(card));

/* ────────────────────────────────────
   INIT — mark first section active
──────────────────────────────────── */
(function init () {
  // Set overview as active on load
  const firstLink = navLinks.find(l => l.dataset.section === 'overview');
  if (firstLink) {
    navLinks.forEach(l => l.classList.remove('active'));
    firstLink.classList.add('active');
  }
  breadcrumbEl.textContent = 'Overview';

  console.log(
    '%c XBzin Admin Dashboard %c Loaded Successfully ',
    'background:#2563eb;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px 0 0 4px',
    'background:#22c55e;color:#fff;font-weight:700;padding:4px 8px;border-radius:0 4px 4px 0'
  );
})();