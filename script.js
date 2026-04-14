/*
 * XBzin Admin Dashboard v2 — script.js
 * Full-featured: Charts, Tables, Modals, Toast, Theme, CommandPalette,
 * Notifications, Activity, Team, Settings, Export, Sorting, Filtering, Pagination
 */

'use strict';

/* ────────────────────────────────────
   DATA
──────────────────────────────────── */
const DATA = {
  projects: [
    { id: 'P-001', name: 'AI Model Deployment v2', module: 'XBzin AI Hub', status: 'ongoing', priority: 'high', progress: 72, lead: 'BS' },
    { id: 'P-002', name: 'Web Portal Revamp', module: 'XBzin Web Services', status: 'ongoing', priority: 'high', progress: 58, lead: 'RK' },
    { id: 'P-003', name: 'Toolkit API Integration', module: 'XBzin Tools', status: 'ongoing', priority: 'medium', progress: 44, lead: 'PK' },
    { id: 'P-004', name: 'Community Forum Launch', module: 'XBzin Community', status: 'ongoing', priority: 'medium', progress: 31, lead: 'AV' },
    { id: 'P-005', name: 'Patent Filing #4 Support', module: 'XBzin AI Hub', status: 'pending', priority: 'high', progress: 10, lead: 'BS' },
    { id: 'P-006', name: 'Analytics Module v3', module: 'XBzin Web Services', status: 'pending', priority: 'medium', progress: 5, lead: 'RK' },
    { id: 'P-007', name: 'Security Audit FY25', module: 'XBzin Tools', status: 'pending', priority: 'high', progress: 0, lead: 'MN' },
    { id: 'P-008', name: 'Mobile App Beta', module: 'XBzin Community', status: 'pending', priority: 'low', progress: 0, lead: 'AV' },
    { id: 'P-009', name: 'Investor Dashboard', module: 'XBzin Web Services', status: 'pending', priority: 'medium', progress: 0, lead: 'RK' },
    { id: 'P-010', name: 'NLP Engine Upgrade', module: 'XBzin AI Hub', status: 'pending', priority: 'high', progress: 0, lead: 'BS' },
    { id: 'P-011', name: 'DevOps Pipeline', module: 'XBzin Tools', status: 'pending', priority: 'medium', progress: 0, lead: 'PK' },
    { id: 'P-012', name: 'Chatbot Integration', module: 'XBzin Community', status: 'pending', priority: 'low', progress: 0, lead: 'AV' },
    { id: 'P-013', name: 'Core ML Pipeline v1', module: 'XBzin AI Hub', status: 'completed', priority: 'high', progress: 100, lead: 'BS' },
  ],

  team: [
    { name: 'Bharat Shukla', role: 'Founder & CEO', module: 'Leadership', initials: 'BS', color: '#2563eb' },
    { name: 'Raj Kumar', role: 'CTO', module: 'XBzin AI Hub', initials: 'RK', color: '#16a34a' },
    { name: 'Priya Kapoor', role: 'Lead Engineer', module: 'XBzin Tools', initials: 'PK', color: '#d97706' },
    { name: 'Anita Verma', role: 'Product Manager', module: 'XBzin Community', initials: 'AV', color: '#dc2626' },
    { name: 'Manish Nair', role: 'Security Lead', module: 'XBzin Tools', initials: 'MN', color: '#7c3aed' },
    { name: 'Suman Das', role: 'Backend Dev', module: 'XBzin Web Services', initials: 'SD', color: '#0891b2' },
    { name: 'Vikram Singh', role: 'Frontend Dev', module: 'XBzin Web Services', initials: 'VS', color: '#be185d' },
    { name: 'Neha Joshi', role: 'AI Researcher', module: 'XBzin AI Hub', initials: 'NJ', color: '#16a34a' },
    { name: 'Arjun Patel', role: 'DevOps', module: 'XBzin Tools', initials: 'AP', color: '#d97706' },
    { name: 'Kavita Rao', role: 'Community Manager', module: 'XBzin Community', initials: 'KR', color: '#dc2626' },
    { name: 'Rahul Mishra', role: 'Data Scientist', module: 'XBzin AI Hub', initials: 'RM', color: '#2563eb' },
    { name: 'Deepa Shah', role: 'UX Designer', module: 'XBzin Web Services', initials: 'DS', color: '#0891b2' },
    { name: 'Arun Gupta', role: 'Backend Dev', module: 'XBzin AI Hub', initials: 'AG', color: '#7c3aed' },
    { name: 'Meera Iyer', role: 'QA Engineer', module: 'XBzin Tools', initials: 'MI', color: '#be185d' },
    { name: 'Kiran Bose', role: 'Marketing', module: 'XBzin Community', initials: 'KB', color: '#16a34a' },
    { name: 'Suresh Pillai', role: 'Sales', module: 'Leadership', initials: 'SP', color: '#d97706' },
  ],

  patents: [
    { id: 'PAT-001', title: 'AI Inference Engine', desc: 'Core AI processing patent covering model inference optimization and adaptive compute allocation for XBzin AI Hub neural pipeline.', tags: ['AI / ML', 'XBzin AI Hub'], status: 'granted', icon: 'fa-microchip', date: 'FY 2023-24' },
    { id: 'PAT-002', title: 'Adaptive Web Routing Protocol', desc: 'Unique request-routing system covering intelligent load balancing and dynamic traffic management algorithms for XBzin Web Services.', tags: ['Networking', 'Web Services'], status: 'granted', icon: 'fa-network-wired', date: 'FY 2023-24' },
    { id: 'PAT-003', title: 'Modular Toolkit Framework', desc: 'Plugin-based extensible toolkit architecture covering modular composition, plugin sandboxing, and runtime extension loading for XBzin Tools.', tags: ['Architecture', 'XBzin Tools'], status: 'granted', icon: 'fa-puzzle-piece', date: 'FY 2024-25' },
    { id: 'PAT-004', title: 'AI Community Recommendation Engine', desc: 'AI-driven community engagement covering personalized content surfacing and social graph analysis for XBzin Community.', tags: ['Community AI', 'XBzin Community'], status: 'pending', icon: 'fa-people-group', date: 'FY 2024-25' },
  ],

  ecosystem: [
    { id: 'ai-hub', name: 'XBzin AI Hub', icon: 'fa-brain', iconBg: 'blue-icon-bg', desc: 'Centralized AI inference, model management, intelligent automation, and neural processing layer for the XBzin ecosystem.', patents: 2, projects: 48, members: 6, health: 96, tags: ['AI', 'ML', 'Inference'], fillClass: '' },
    { id: 'web-services', name: 'XBzin Web Services', icon: 'fa-globe', iconBg: 'green-icon-bg', desc: 'Scalable web infrastructure, API gateway, adaptive routing protocol, and full-stack delivery platform powering all web-facing products.', patents: 1, projects: 55, members: 4, health: 99, tags: ['API', 'Cloud', 'Web'], fillClass: 'green-fill' },
    { id: 'tools', name: 'XBzin Tools', icon: 'fa-screwdriver-wrench', iconBg: 'yellow-icon-bg', desc: 'Modular developer toolkit with extensible plugins, workflow automation utilities, and integration bridges for the XBzin ecosystem.', patents: 1, projects: 19, members: 3, health: 88, tags: ['DevTools', 'Plugins', 'SDK'], fillClass: 'yellow-fill' },
    { id: 'community', name: 'XBzin Community', icon: 'fa-users-between-lines', iconBg: 'red-icon-bg', desc: 'AI-powered community platform fostering developer collaboration, knowledge sharing, and peer learning across the XBzin ecosystem.', patents: '1*', projects: 7, members: 3, health: 72, tags: ['Community', 'Social', 'AI'], fillClass: 'red-fill' },
  ],

  activities: [
    { type: 'success', icon: 'fa-circle-check', title: 'Patent PAT-004 filing submitted', meta: 'XBzin AI Hub · Finance', time: '2h ago' },
    { type: 'info', icon: 'fa-indian-rupee-sign', title: 'Funding Round 2 report generated', meta: 'Finance · Admin', time: '5h ago' },
    { type: 'warning', icon: 'fa-triangle-exclamation', title: '9 projects awaiting review action', meta: 'Projects · Management', time: '1d ago' },
    { type: 'success', icon: 'fa-users', title: 'New team member Suresh Pillai added', meta: 'HR · Leadership', time: '2d ago' },
    { type: 'info', icon: 'fa-chart-line', title: 'Q4 analytics report exported', meta: 'Analytics · Reports', time: '3d ago' },
    { type: 'success', icon: 'fa-file-shield', title: 'Patent PAT-003 granted by authority', meta: 'Legal · Patents', time: '5d ago' },
    { type: 'info', icon: 'fa-sack-dollar', title: 'Funding Round 2 ₹19L received', meta: 'Finance · Funding', time: '1w ago' },
    { type: 'success', icon: 'fa-diagram-project', title: 'Project P-013 completed successfully', meta: 'Projects · XBzin AI Hub', time: '1w ago' },
  ],
};

/* ────────────────────────────────────
   STATE
──────────────────────────────────── */
const state = {
  theme: 'light',
  sidebarCollapsed: false,
  currentSection: 'overview',
  projectFilter: 'all',
  moduleFilter: 'all',
  projectSearch: '',
  sortCol: 'id',
  sortDir: 'asc',
  page: 1,
  rowsPerPage: 6,
  notifCount: 3,
  autoRefreshInterval: null,
};

/* ────────────────────────────────────
   UTILS
──────────────────────────────────── */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/* ────────────────────────────────────
   LOADING SCREEN
──────────────────────────────────── */
async function runLoadingScreen() {
  const fill = $('#loadFill');
  const text = $('#loadText');
  const msgs = ['Connecting to XBzin servers...', 'Loading ecosystem data...', 'Rendering charts...', 'Almost ready...'];
  for (let i = 0; i <= 100; i += 2) {
    await sleep(20);
    fill.style.width = i + '%';
    if (i === 20) text.textContent = msgs[1];
    if (i === 50) text.textContent = msgs[2];
    if (i === 80) text.textContent = msgs[3];
  }
  await sleep(200);
  $('#loadingScreen').classList.add('hidden');
}

/* ────────────────────────────────────
   TOAST
──────────────────────────────────── */
function showToast(msg, type = 'info', duration = 3500) {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${msg}</span><span class="toast-close"><i class="fa-solid fa-xmark"></i></span>`;
  $('#toastContainer').appendChild(t);
  t.querySelector('.toast-close').onclick = () => t.remove();
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(20px)';
    t.style.transition = 'all .3s';
    setTimeout(() => t.remove(), 300);
  }, duration);
}

/* ────────────────────────────────────
   LIVE CLOCK
──────────────────────────────────── */
function updateClock() {
  const el = $('#liveClock');
  if (!el) return;
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  el.textContent = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}  ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ────────────────────────────────────
   THEME TOGGLE
──────────────────────────────────── */
function setTheme(dark) {
  state.theme = dark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = $('#themeIcon');
  if (icon) { icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'; }
  const dtToggle = $('#darkModeToggle');
  if (dtToggle) dtToggle.checked = dark;
  updateAllCharts();
  showToast(dark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 2000);
}

$('#themeToggle')?.addEventListener('click', () => setTheme(state.theme === 'light'));
$('#darkModeToggle')?.addEventListener('change', function () { setTheme(this.checked); });

/* ────────────────────────────────────
   FULLSCREEN
──────────────────────────────────── */
$('#fullscreenBtn')?.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    $('#fullscreenBtn').querySelector('i').className = 'fa-solid fa-compress';
    showToast('Fullscreen mode enabled', 'info', 2000);
  } else {
    document.exitFullscreen();
    $('#fullscreenBtn').querySelector('i').className = 'fa-solid fa-expand';
  }
});

/* ────────────────────────────────────
   SIDEBAR
──────────────────────────────────── */
const sidebar = $('#sidebar');
const mainWrapper = $('#mainWrapper');
const overlay = $('#overlay');

function openSidebarMobile() {
  sidebar.classList.add('mobile-open');
  overlay.classList.add('active');
}
function closeSidebarMobile() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('active');
}
function toggleCollapse() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
  mainWrapper.classList.toggle('collapsed-mw', state.sidebarCollapsed);
  const compactToggle = $('#compactSidebarToggle');
  if (compactToggle) compactToggle.checked = state.sidebarCollapsed;
}

$('#menuToggle')?.addEventListener('click', () => {
  if (window.innerWidth <= 768) openSidebarMobile();
  else toggleCollapse();
});
$('#sidebarPin')?.addEventListener('click', toggleCollapse);
overlay.addEventListener('click', closeSidebarMobile);
$('#compactSidebarToggle')?.addEventListener('change', function () { if (state.sidebarCollapsed !== this.checked) toggleCollapse(); });

/* ────────────────────────────────────
   NAV + SECTION SWITCHING
──────────────────────────────────── */
const navLinks = $$('.nav-link[data-section]');

function switchSection(sectionId) {
  state.currentSection = sectionId;
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === sectionId));
  const activeLink = navLinks.find(l => l.dataset.section === sectionId);
  if (activeLink) $('#bcCurrent').textContent = activeLink.querySelector('.nav-label').textContent;
  const sec = $(`#${sectionId}`);
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (window.innerWidth <= 768) closeSidebarMobile();
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(link.dataset.section);
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  $$('.pg-section[id]').forEach(sec => {
    if (sec.offsetTop <= scrollY && sec.offsetTop + sec.offsetHeight > scrollY) {
      const id = sec.id;
      if (id !== state.currentSection) {
        state.currentSection = id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        const activeLink = navLinks.find(l => l.dataset.section === id);
        if (activeLink) $('#bcCurrent').textContent = activeLink.querySelector('.nav-label').textContent;
      }
    }
  });
}, { passive: true });

/* ────────────────────────────────────
   NOTIFICATIONS
──────────────────────────────────── */
const notifPanel = $('#notifPanel');
$('#notifTrigger')?.addEventListener('click', (e) => {
  e.stopPropagation();
  notifPanel.classList.toggle('open');
  $('#profileDropdown')?.classList.add('hidden');
});
$('#clearAllNotif')?.addEventListener('click', () => {
  $$('.np-item.unread').forEach(i => i.classList.remove('unread'));
  state.notifCount = 0;
  updateNotifBadge();
  showToast('All notifications marked as read', 'success', 2500);
});
$$('.np-x').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = btn.closest('.np-item');
    if (item.classList.contains('unread')) {
      state.notifCount = Math.max(0, state.notifCount - 1);
      updateNotifBadge();
    }
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    item.style.transition = 'all .2s';
    setTimeout(() => item.remove(), 200);
  });
});
function updateNotifBadge() {
  const b = $('#notifBadge');
  if (!b) return;
  b.textContent = state.notifCount;
  b.style.display = state.notifCount > 0 ? 'flex' : 'none';
}

/* ────────────────────────────────────
   PROFILE DROPDOWN
──────────────────────────────────── */
$('#profileBtn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const pd = $('#profileDropdown');
  pd.classList.toggle('hidden');
  notifPanel.classList.remove('open');
});
document.addEventListener('click', () => {
  $('#profileDropdown')?.classList.add('hidden');
  notifPanel.classList.remove('open');
});

/* ────────────────────────────────────
   COMMAND PALETTE
──────────────────────────────────── */
const cmdItems = [
  { label: 'Overview Dashboard', section: 'overview', icon: 'fa-gauge-high' },
  { label: 'Analytics & Charts', section: 'analytics', icon: 'fa-chart-mixed' },
  { label: 'Project Management', section: 'projects', icon: 'fa-diagram-project' },
  { label: 'Funding & Investment', section: 'funding', icon: 'fa-indian-rupee-sign' },
  { label: 'Patent Tracker', section: 'patents', icon: 'fa-file-shield' },
  { label: 'Ecosystem Modules', section: 'ecosystem', icon: 'fa-cubes' },
  { label: 'Team Directory', section: 'team', icon: 'fa-users' },
  { label: 'Activity Log', section: 'activity', icon: 'fa-bolt' },
  { label: 'Dashboard Settings', section: 'settings', icon: 'fa-gear' },
  { label: 'Total Employees: 16', section: 'overview', icon: 'fa-users' },
  { label: 'Company Valuation: ₹1 Crore', section: 'funding', icon: 'fa-building' },
  { label: 'Projects Completed: 129', section: 'projects', icon: 'fa-circle-check' },
  { label: 'Total Patents: 4', section: 'patents', icon: 'fa-file-shield' },
];

let cmdSelected = -1;

function openCmdPalette() {
  const p = $('#cmdPalette');
  p.classList.remove('hidden');
  $('#cmdInput').value = '';
  renderCmdResults('');
  setTimeout(() => $('#cmdInput').focus(), 50);
}
function closeCmdPalette() {
  $('#cmdPalette').classList.add('hidden');
  cmdSelected = -1;
}
function renderCmdResults(q) {
  const results = q ? cmdItems.filter(i => i.label.toLowerCase().includes(q.toLowerCase())) : cmdItems;
  const c = $('#cmdResults');
  c.innerHTML = results.length ? results.map((r, i) =>
    `<div class="cmd-result-item${i === cmdSelected ? ' active' : ''}" data-idx="${i}" data-section="${r.section}">
      <i class="fa-solid ${r.icon}"></i><span>${r.label}</span><span class="cmd-section">${r.section}</span>
    </div>`
  ).join('') : `<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">No results found</div>`;
  $$('.cmd-result-item').forEach(el => {
    el.addEventListener('click', () => {
      switchSection(el.dataset.section);
      closeCmdPalette();
    });
  });
}
$('#cmdInput')?.addEventListener('input', function () { cmdSelected = -1; renderCmdResults(this.value); });
$('#cmdInput')?.addEventListener('keydown', (e) => {
  const items = $$('.cmd-result-item');
  if (e.key === 'ArrowDown') { cmdSelected = Math.min(cmdSelected + 1, items.length - 1); }
  if (e.key === 'ArrowUp') { cmdSelected = Math.max(cmdSelected - 1, 0); }
  if (e.key === 'Enter' && cmdSelected >= 0 && items[cmdSelected]) { items[cmdSelected].click(); }
  if (e.key === 'Escape') closeCmdPalette();
  renderCmdResults($('#cmdInput').value);
});
$('#cmdTrigger')?.addEventListener('click', openCmdPalette);
$('#cmdTriggerSidebar')?.addEventListener('click', openCmdPalette);
$('#cmdBackdrop')?.addEventListener('click', closeCmdPalette);
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openCmdPalette(); }
  if (e.key === 'Escape') closeCmdPalette();
});

/* ────────────────────────────────────
   COUNTER ANIMATION
──────────────────────────────────── */
function animateCounter(el, target, duration = 1400) {
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCounter(el, parseInt(el.dataset.target));
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
$$('[data-target]').forEach(el => counterObs.observe(el));

/* ────────────────────────────────────
   SPARKLINE CHARTS
──────────────────────────────────── */
function drawSparkline(canvas, values, color = '#2563eb') {
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 200;
  canvas.height = 40;
  const w = canvas.width, h = canvas.height;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => ({ x: (i / (values.length - 1)) * w, y: h - ((v - min) / range) * (h - 6) - 3 }));
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i - 1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.lineTo(pts[pts.length - 1].x, h);
  ctx.lineTo(pts[0].x, h);
  ctx.closePath();
  ctx.fillStyle = color + '18';
  ctx.fill();
}

function initSparklines() {
  $$('.spark-canvas').forEach(canvas => {
    const vals = canvas.dataset.vals.split(',').map(Number);
    const color = canvas.dataset.color || '#2563eb';
    setTimeout(() => drawSparkline(canvas, vals, color), 100);
  });
}

/* ────────────────────────────────────
   CHART.JS SETUP
──────────────────────────────────── */
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.animation.duration = 900;

const C = { green: '#16a34a', yellow: '#d97706', red: '#dc2626', blue: '#2563eb', black: '#0f172a' };
const chartInstances = {};

function getTextColor() {
  return state.theme === 'dark' ? '#94a3b8' : '#64748b';
}
function getGridColor() {
  return state.theme === 'dark' ? '#334155' : '#f1f5f9';
}
function tooltipConfig() {
  return {
    backgroundColor: state.theme === 'dark' ? '#1e293b' : '#0f172a',
    titleColor: '#fff', bodyColor: '#94a3b8',
    padding: 12, cornerRadius: 10, borderWidth: 1,
    borderColor: state.theme === 'dark' ? '#334155' : '#1e293b',
  };
}

function initProjectChart() {
  const ctx = $('#projectChart');
  if (!ctx) return;
  if (chartInstances.project) chartInstances.project.destroy();
  chartInstances.project = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Ongoing', 'Pending'],
      datasets: [{ data: [129, 4, 9], backgroundColor: [C.green, C.yellow, C.red], borderColor: 'transparent', borderWidth: 3, hoverOffset: 10 }],
    },
    options: { cutout: '72%', responsive: true, maintainAspectRatio: false, plugins: { tooltip: { ...tooltipConfig(), callbacks: { label: c => ` ${c.label}: ${c.raw} projects` } } } },
  });
}

function initFundingChart() {
  const ctx = $('#fundingChart');
  if (!ctx) return;
  if (chartInstances.funding) chartInstances.funding.destroy();
  const tc = getTextColor(), gc = getGridColor();
  chartInstances.funding = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Round 1 (Seed)', 'Round 2 (Series A)'],
      datasets: [{ label: 'Amount (₹L)', data: [16, 19], backgroundColor: [C.blue, C.green], borderRadius: 10, borderSkipped: false, maxBarThickness: 70 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: tc } },
        y: { beginAtZero: true, max: 25, ticks: { callback: v => `₹${v}L`, color: tc, stepSize: 5 }, grid: { color: gc }, border: { display: false } },
      },
      plugins: { tooltip: { ...tooltipConfig(), callbacks: { label: c => ` ₹${c.raw} Lakhs` } } },
    },
  });
}

function initInvestChart() {
  const ctx = $('#investChart');
  if (!ctx) return;
  if (chartInstances.invest) chartInstances.invest.destroy();
  const tc = getTextColor(), gc = getGridColor();
  chartInstances.invest = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Q1 FY23', 'Q2 FY23', 'Q3 FY23', 'Q4 FY23', 'Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24', 'Q1 FY25'],
      datasets: [
        { label: 'Investment', data: [0, 5, 10, 16, 16, 30, 35, 38, 43], borderColor: C.blue, backgroundColor: C.blue + '12', pointBackgroundColor: C.blue, pointRadius: 4, pointHoverRadius: 7, tension: 0.45, fill: true, borderWidth: 2.5 },
        { label: 'Fund Used', data: [5, 12, 22, 30, 38, 48, 58, 68, 78], borderColor: C.red, backgroundColor: C.red + '0e', pointBackgroundColor: C.red, pointRadius: 4, pointHoverRadius: 7, tension: 0.45, fill: true, borderWidth: 2.5 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: tc } },
        y: { beginAtZero: true, ticks: { callback: v => `₹${v}L`, color: tc }, grid: { color: gc }, border: { display: false } },
      },
      plugins: { tooltip: { ...tooltipConfig(), callbacks: { label: c => ` ${c.dataset.label}: ₹${c.raw}L` } } },
    },
  });
}

function initPatentChart() {
  const ctx = $('#patentChart');
  if (!ctx) return;
  if (chartInstances.patent) chartInstances.patent.destroy();
  chartInstances.patent = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Granted', 'Pending'],
      datasets: [{ data: [3, 1], backgroundColor: [C.green, C.yellow], borderColor: 'transparent', borderWidth: 3, hoverOffset: 8 }],
    },
    options: { cutout: '72%', responsive: true, maintainAspectRatio: false, plugins: { tooltip: { ...tooltipConfig(), callbacks: { label: c => ` ${c.label}: ${c.raw} patent${c.raw > 1 ? 's' : ''}` } } } },
  });
}

function initAllCharts() {
  initProjectChart();
  initFundingChart();
  initInvestChart();
  initPatentChart();
}
function updateAllCharts() {
  setTimeout(() => {
    initAllCharts();
  }, 50);
}

/* ────────────────────────────────────
   CHART EXPORT
──────────────────────────────────── */
function downloadChart(chartId, name = 'chart') {
  const canvas = $(`#${chartId}`);
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `xbzin-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast(`Chart "${name}" downloaded!`, 'success');
}

/* ────────────────────────────────────
   CHART EXPAND
──────────────────────────────────── */
function expandChart(cardId, title = 'Chart') {
  const modal = $('#chartExpandModal');
  const canvas = $(`#${cardId} canvas`);
  if (!modal || !canvas) return;
  $('#cemTitle').textContent = title;
  modal.classList.remove('hidden');
  const expandedCanvas = $('#expandedChartCanvas');
  const chart = Object.values(chartInstances).find(c => c.canvas.id === canvas.id);
  if (chart && expandedCanvas) {
    if (window._expandedChartInst) window._expandedChartInst.destroy();
    window._expandedChartInst = new Chart(expandedCanvas, JSON.parse(JSON.stringify({ type: chart.config.type, data: chart.data, options: { ...chart.options, animation: { duration: 400 } } })));
  }
}
function closeExpandModal() {
  $('#chartExpandModal')?.classList.add('hidden');
  if (window._expandedChartInst) { window._expandedChartInst.destroy(); window._expandedChartInst = null; }
}

/* ────────────────────────────────────
   PROJECTS TABLE
──────────────────────────────────── */
function getFilteredProjects() {
  return DATA.projects.filter(p => {
    const fMatch = state.projectFilter === 'all' || p.status === state.projectFilter;
    const mMatch = state.moduleFilter === 'all' || p.module === state.moduleFilter;
    const q = state.projectSearch.toLowerCase();
    const sMatch = !q || p.name.toLowerCase().includes(q) || p.module.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    return fMatch && mMatch && sMatch;
  }).sort((a, b) => {
    const dir = state.sortDir === 'asc' ? 1 : -1;
    const va = a[state.sortCol] ?? '', vb = b[state.sortCol] ?? '';
    return typeof va === 'number' ? (va - vb) * dir : String(va).localeCompare(String(vb)) * dir;
  });
}

function renderProjects() {
  const all = getFilteredProjects();
  const total = all.length;
  const start = (state.page - 1) * state.rowsPerPage;
  const paged = all.slice(start, start + state.rowsPerPage);
  const tbody = $('#projectTbody');
  if (!tbody) return;

  if (paged.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text3)"><i class="fa-solid fa-inbox" style="font-size:28px;display:block;margin-bottom:8px"></i>No projects found</td></tr>`;
  } else {
    tbody.innerHTML = paged.map(p => {
      const sBadge = { ongoing: 's-ongoing', pending: 's-pending', completed: 's-completed' };
      const pBadge = { high: 'p-high', medium: 'p-med', low: 'p-low' };
      const statusLabel = { ongoing: '<i class="fa-solid fa-rotate fa-spin" style="font-size:10px"></i> Ongoing', pending: '<i class="fa-solid fa-clock" style="font-size:10px"></i> Pending', completed: '<i class="fa-solid fa-check" style="font-size:10px"></i> Completed' };
      return `<tr>
        <td style="font-weight:700;color:var(--text);font-size:12px">${p.id}</td>
        <td><span style="font-weight:600;color:var(--text)">${p.name}</span></td>
        <td><span style="font-size:12px;color:var(--text2)">${p.module}</span></td>
        <td><span class="s-badge ${sBadge[p.status]}">${statusLabel[p.status]}</span></td>
        <td><span class="p-badge ${pBadge[p.priority]}">${p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}</span></td>
        <td><div class="prog-wrap"><div class="prog-bar"><div class="prog-fill" style="width:${p.progress}%"></div></div><span class="prog-num">${p.progress}%</span></div></td>
        <td><div class="lead-av" style="background:#2563eb;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">${p.lead}</div></td>
        <td><div class="tbl-act">
          <button class="tbl-btn" title="View" onclick="viewProject('${p.id}')"><i class="fa-solid fa-eye"></i></button>
          <button class="tbl-btn" title="Edit" onclick="editProject('${p.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="tbl-btn del" title="Delete" onclick="deleteProject('${p.id}')"><i class="fa-solid fa-trash"></i></button>
        </div></td>
      </tr>`;
    }).join('');
  }

  const end = Math.min(start + state.rowsPerPage, total);
  $('#tableInfo').textContent = `Showing ${total > 0 ? start + 1 : 0}–${end} of ${total} projects`;
  renderPagination(total);
}

function renderPagination(total) {
  const pages = Math.ceil(total / state.rowsPerPage);
  const pg = $('#pagination');
  if (!pg) return;
  let html = '';
  if (state.page > 1) html += `<button class="pg-btn" onclick="goPage(${state.page - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;
  for (let i = 1; i <= pages; i++) {
    html += `<button class="pg-btn${state.page === i ? ' active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }
  if (state.page < pages) html += `<button class="pg-btn" onclick="goPage(${state.page + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
  pg.innerHTML = html;
}

function goPage(p) { state.page = p; renderProjects(); }

$$('.fpill').forEach(btn => {
  btn.addEventListener('click', function () {
    $$('.fpill').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    state.projectFilter = this.dataset.filter;
    state.page = 1;
    renderProjects();
  });
});

$('#moduleFilter')?.addEventListener('change', function () { state.moduleFilter = this.value; state.page = 1; renderProjects(); });
$('#projectSearch')?.addEventListener('input', function () { state.projectSearch = this.value; state.page = 1; renderProjects(); });

$$('.th-sort').forEach(th => {
  th.addEventListener('click', function () {
    const col = this.dataset.col;
    if (state.sortCol === col) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    else { state.sortCol = col; state.sortDir = 'asc'; }
    $$('.th-sort i').forEach(i => { i.className = 'fa-solid fa-sort'; i.style.opacity = '.4'; });
    const icon = this.querySelector('i');
    icon.className = `fa-solid fa-sort-${state.sortDir === 'asc' ? 'up' : 'down'}`;
    icon.style.opacity = '1';
    renderProjects();
  });
});

window.viewProject = function (id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p) return;
  showModal('Project Details', `
    <div class="form-group"><label>Project ID</label><input value="${p.id}" readonly/></div>
    <div class="form-group"><label>Name</label><input value="${p.name}" readonly/></div>
    <div class="form-group"><label>Module</label><input value="${p.module}" readonly/></div>
    <div class="form-group"><label>Status</label><input value="${p.status}" readonly/></div>
    <div class="form-group"><label>Priority</label><input value="${p.priority}" readonly/></div>
    <div class="form-group"><label>Progress</label><input value="${p.progress}%" readonly/></div>
  `, null);
};

window.editProject = function (id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p) return;
  showModal('Edit Project', `
    <div class="form-group"><label>Project Name</label><input id="ep_name" value="${p.name}"/></div>
    <div class="form-group"><label>Module</label>
      <select id="ep_module">
        ${['XBzin AI Hub', 'XBzin Web Services', 'XBzin Tools', 'XBzin Community'].map(m => `<option${p.module === m ? ' selected' : ''}>${m}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Status</label>
      <select id="ep_status">
        ${['ongoing', 'pending', 'completed'].map(s => `<option${p.status === s ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Priority</label>
      <select id="ep_priority">
        ${['high', 'medium', 'low'].map(s => `<option${p.priority === s ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Progress (%)</label><input type="number" id="ep_progress" value="${p.progress}" min="0" max="100"/></div>
  `, () => {
    p.name = $('#ep_name').value;
    p.module = $('#ep_module').value;
    p.status = $('#ep_status').value;
    p.priority = $('#ep_priority').value;
    p.progress = parseInt($('#ep_progress').value) || 0;
    renderProjects();
    showToast(`Project "${p.name}" updated!`, 'success');
    addActivity('info', 'fa-pen', `Project ${p.id} updated`, 'Projects · Admin', 'just now');
  });
};

window.deleteProject = function (id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p) return;
  showModal('Delete Project', `
    <div style="text-align:center;padding:10px 0">
      <i class="fa-solid fa-triangle-exclamation" style="font-size:40px;color:var(--red);margin-bottom:12px;display:block"></i>
      <p style="font-size:14px;color:var(--text);margin-bottom:6px">Are you sure you want to delete</p>
      <p style="font-weight:700;color:var(--text)">"${p.name}"?</p>
      <p style="font-size:12px;color:var(--text3);margin-top:8px">This action cannot be undone.</p>
    </div>
  `, () => {
    const idx = DATA.projects.indexOf(p);
    DATA.projects.splice(idx, 1);
    renderProjects();
    showToast(`Project "${p.name}" deleted`, 'error');
    addActivity('error', 'fa-trash', `Project ${p.id} deleted`, 'Projects · Admin', 'just now');
  });
};

$('#addProjectBtn')?.addEventListener('click', () => {
  showModal('Add New Project', `
    <div class="form-group"><label>Project Name *</label><input id="np_name" placeholder="Enter project name"/></div>
    <div class="form-group"><label>Module *</label>
      <select id="np_module"><option>XBzin AI Hub</option><option>XBzin Web Services</option><option>XBzin Tools</option><option>XBzin Community</option></select>
    </div>
    <div class="form-group"><label>Status</label>
      <select id="np_status"><option value="pending">Pending</option><option value="ongoing">Ongoing</option></select>
    </div>
    <div class="form-group"><label>Priority</label>
      <select id="np_priority"><option value="medium">Medium</option><option value="high">High</option><option value="low">Low</option></select>
    </div>
    <div class="form-group"><label>Lead (initials)</label><input id="np_lead" placeholder="e.g. BS" maxlength="3"/></div>
  `, () => {
    const name = $('#np_name').value.trim();
    if (!name) { showToast('Project name is required!', 'warning'); return false; }
    const newId = `P-${String(DATA.projects.length + 1).padStart(3, '0')}`;
    DATA.projects.unshift({ id: newId, name, module: $('#np_module').value, status: $('#np_status').value, priority: $('#np_priority').value, progress: 0, lead: $('#np_lead').value || 'BS' });
    state.page = 1;
    renderProjects();
    showToast(`Project "${name}" added!`, 'success');
    addActivity('success', 'fa-plus', `New project "${name}" created`, 'Projects · Admin', 'just now');
  });
});

$('#exportProjectsBtn')?.addEventListener('click', () => {
  const rows = [['ID', 'Name', 'Module', 'Status', 'Priority', 'Progress', 'Lead']];
  DATA.projects.forEach(p => rows.push([p.id, p.name, p.module, p.status, p.priority, p.progress + '%', p.lead]));
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `xbzin-projects-${Date.now()}.csv`;
  link.click();
  showToast('Projects exported as CSV!', 'success');
});

/* ────────────────────────────────────
   MODAL SYSTEM
──────────────────────────────────── */
function showModal(title, bodyHtml, onSubmit) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHtml;
  const backdrop = $('#modalBackdrop');
  backdrop.classList.remove('hidden');
  const submitBtn = $('#modalSubmit');
  if (onSubmit === null) submitBtn.style.display = 'none';
  else { submitBtn.style.display = ''; submitBtn.onclick = () => { if (onSubmit() !== false) closeModal(); }; }
}
function closeModal() {
  $('#modalBackdrop').classList.add('hidden');
  $('#modalSubmit').style.display = '';
}
$('#modalClose')?.addEventListener('click', closeModal);
$('#modalCancel')?.addEventListener('click', closeModal);
$('#modalBackdrop')?.addEventListener('click', (e) => { if (e.target === $('#modalBackdrop')) closeModal(); });

/* ────────────────────────────────────
   TEAM GRID
──────────────────────────────────── */
function renderTeam() {
  const grid = $('#teamGrid');
  if (!grid) return;
  grid.innerHTML = DATA.team.map(m => `
    <div class="team-card">
      <div class="tc-avatar" style="background:${m.color}">${m.initials}</div>
      <p class="tc-name">${m.name}</p>
      <p class="tc-role">${m.role}</p>
      <span class="tc-module">${m.module}</span>
    </div>
  `).join('');
}

/* ────────────────────────────────────
   PATENT CARDS
──────────────────────────────────── */
function renderPatents() {
  const grid = $('#patentGrid');
  if (!grid) return;
  grid.innerHTML = DATA.patents.map(p => `
    <div class="patent-pro-card ${p.status === 'granted' ? 'patent-granted' : 'patent-pending'}">
      <div class="ppc-header">
        <div class="ppc-num">${p.id}</div>
        <span class="${p.status === 'granted' ? 'ppc-badge-granted' : 'ppc-badge-pending'}">${p.status === 'granted' ? 'Granted' : 'Pending'}</span>
      </div>
      <div class="ppc-icon-area"><i class="fa-solid ${p.icon}" style="font-size:32px;color:var(--g300)"></i></div>
      <h3 class="ppc-title">${p.title}</h3>
      <p class="ppc-desc">${p.desc}</p>
      <div class="ppc-tags">${p.tags.map(t => `<span class="ppc-tag">${t}</span>`).join('')}</div>
      <div class="ppc-footer">
        <span><i class="fa-solid fa-calendar-${p.status === 'granted' ? 'check' : 'clock'}"></i> ${p.status === 'granted' ? 'Granted' : 'Filed'} ${p.date}</span>
        <button class="ppc-view-btn" onclick="showToast('${p.title} details opened','info')">${p.status === 'granted' ? 'View Details' : 'Track Status'}</button>
      </div>
    </div>
  `).join('');
}

/* ────────────────────────────────────
   ECOSYSTEM MODULES
──────────────────────────────────── */
function renderEcosystem() {
  const grid = $('#ecoGrid');
  if (!grid) return;
  grid.innerHTML = DATA.ecosystem.map(m => `
    <div class="eco-module-card">
      <div class="emc-status-bar active"></div>
      <div class="emc-top">
        <div class="emc-icon ${m.iconBg}"><i class="fa-solid ${m.icon}"></i></div>
        <div class="emc-live"><span class="emc-live-dot"></span>Live</div>
      </div>
      <h3 class="emc-name">${m.name}</h3>
      <p class="emc-desc">${m.desc}</p>
      <div class="emc-stats">
        <div class="emc-stat"><p class="emc-sval">${m.patents}</p><p class="emc-slbl">Patents</p></div>
        <div class="emc-stat"><p class="emc-sval">${m.projects}</p><p class="emc-slbl">Projects</p></div>
        <div class="emc-stat"><p class="emc-sval">${m.members}</p><p class="emc-slbl">Members</p></div>
      </div>
      <div class="emc-health-row">
        <div class="emc-health-bar"><div class="emc-health-fill ${m.fillClass}" style="width:${m.health}%"></div></div>
        <span class="emc-health-pct">${m.health}%</span>
      </div>
      <div class="emc-footer">
        <div class="emc-tags">${m.tags.map(t => `<span class="emc-tag">${t}</span>`).join('')}</div>
        <button class="emc-details-btn" onclick="showToast('${m.name} details panel coming soon!','info')">Details <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  `).join('');
}

/* ────────────────────────────────────
   ACTIVITY LOG
──────────────────────────────────── */
function addActivity(type, icon, title, meta, time = 'just now') {
  DATA.activities.unshift({ type, icon, title, meta, time });
  renderActivity();
}

function renderActivity() {
  const feed = $('#activityFeed');
  if (!feed) return;
  const colors = { success: 'green-icon-bg', info: 'blue-icon-bg', warning: 'yellow-icon-bg', error: 'red-icon-bg' };
  feed.innerHTML = DATA.activities.map(a => `
    <div class="af-item">
      <div class="af-icon ${colors[a.type] || 'blue-icon-bg'}"><i class="fa-solid ${a.icon}"></i></div>
      <div class="af-body">
        <p class="af-title">${a.title}</p>
        <p class="af-meta"><i class="fa-solid fa-circle" style="font-size:5px"></i> ${a.meta}</p>
      </div>
      <span class="af-time">${a.time}</span>
    </div>
  `).join('');
}

$('#clearActivityBtn')?.addEventListener('click', () => {
  DATA.activities = [];
  renderActivity();
  showToast('Activity log cleared', 'info');
});

$('#addActivityBtn')?.addEventListener('click', () => {
  showModal('Add Activity Event', `
    <div class="form-group"><label>Event Title *</label><input id="ae_title" placeholder="e.g. Project milestone reached"/></div>
    <div class="form-group"><label>Module / Category</label><input id="ae_meta" placeholder="e.g. Projects · Admin"/></div>
    <div class="form-group"><label>Type</label>
      <select id="ae_type"><option value="success">Success</option><option value="info">Info</option><option value="warning">Warning</option><option value="error">Error</option></select>
    </div>
  `, () => {
    const title = $('#ae_title').value.trim();
    if (!title) { showToast('Event title required!', 'warning'); return false; }
    const icons = { success: 'fa-circle-check', info: 'fa-circle-info', warning: 'fa-triangle-exclamation', error: 'fa-circle-xmark' };
    const type = $('#ae_type').value;
    addActivity(type, icons[type], title, $('#ae_meta').value || 'General', 'just now');
    showToast('Activity event added!', 'success');
  });
});

/* ────────────────────────────────────
   ADD PATENT
──────────────────────────────────── */
$('#addPatentBtn')?.addEventListener('click', () => {
  showModal('File New Patent', `
    <div class="form-group"><label>Patent Title *</label><input id="np_title" placeholder="Enter patent title"/></div>
    <div class="form-group"><label>Description</label><textarea id="np_desc" rows="3" placeholder="Brief description of the invention..."></textarea></div>
    <div class="form-group"><label>Module</label>
      <select id="np_module"><option>XBzin AI Hub</option><option>XBzin Web Services</option><option>XBzin Tools</option><option>XBzin Community</option></select>
    </div>
  `, () => {
    const title = $('#np_title').value.trim();
    if (!title) { showToast('Patent title required!', 'warning'); return false; }
    const newId = `PAT-00${DATA.patents.length + 1}`;
    DATA.patents.push({ id: newId, title, desc: $('#np_desc').value || 'Patent description pending.', tags: [$('#np_module').value], status: 'pending', icon: 'fa-file-shield', date: 'FY 2024-25' });
    renderPatents();
    showToast(`Patent "${title}" filed successfully!`, 'success');
    addActivity('info', 'fa-file-shield', `New patent "${title}" filed`, 'Legal · Patents', 'just now');
  });
});

/* ────────────────────────────────────
   CHART REFRESH
──────────────────────────────────── */
$('#refreshCharts')?.addEventListener('click', () => {
  const btn = $('#refreshCharts');
  btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Refreshing...';
  setTimeout(() => {
    initAllCharts();
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh';
    showToast('Charts refreshed!', 'success', 2000);
  }, 800);
});

/* ────────────────────────────────────
   AUTO REFRESH
──────────────────────────────────── */
$('#autoRefreshToggle')?.addEventListener('change', function () {
  if (this.checked) {
    state.autoRefreshInterval = setInterval(() => { initAllCharts(); }, 30000);
    showToast('Auto-refresh enabled (30s)', 'info', 2000);
  } else {
    clearInterval(state.autoRefreshInterval);
    showToast('Auto-refresh disabled', 'info', 2000);
  }
});

/* ────────────────────────────────────
   EXPORT FULL REPORT
──────────────────────────────────── */
$('#exportBtn')?.addEventListener('click', () => exportReport());
$('#exportAllBtn')?.addEventListener('click', () => exportReport());

function exportReport() {
  const rows = [['XBzin Ecosystem Admin Report'], ['Generated:', new Date().toLocaleString()], [],
    ['=== KPI SUMMARY ==='], ['Metric', 'Value'],
    ['Total Employees', 16], ['Projects Completed', 129], ['Ongoing Projects', 4],
    ['Pending Projects', 9], ['Company Valuation', '₹1,00,00,000'],
    ['Total Investment', '₹43,00,000'], ['Fund Utilized', '₹78,00,000'],
    ['Total Patents', 4], ['Granted Patents', 3], ['Pending Patents', 1], [],
    ['=== PROJECTS ==='], ['ID', 'Name', 'Module', 'Status', 'Priority', 'Progress'],
    ...DATA.projects.map(p => [p.id, p.name, p.module, p.status, p.priority, p.progress + '%']), [],
    ['=== TEAM ==='], ['Name', 'Role', 'Module'],
    ...DATA.team.map(m => [m.name, m.role, m.module]),
  ];
  const csv = rows.map(r => Array.isArray(r) ? r.map(c => `"${c}"`).join(',') : `"${r}"`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `xbzin-full-report-${Date.now()}.csv`;
  link.click();
  showToast('Full report exported!', 'success');
  addActivity('success', 'fa-file-export', 'Full report exported as CSV', 'Reports · Admin', 'just now');
}

/* ────────────────────────────────────
   SETTINGS
──────────────────────────────────── */
$('#animToggle')?.addEventListener('change', function () {
  document.documentElement.style.setProperty('--t', this.checked ? '180ms ease' : '0ms');
  showToast(this.checked ? 'Animations enabled' : 'Animations disabled', 'info', 2000);
});
$('#resetBtn')?.addEventListener('click', () => {
  showModal('Reset Dashboard', `
    <div style="text-align:center;padding:10px 0">
      <i class="fa-solid fa-rotate-left" style="font-size:40px;color:var(--yellow);margin-bottom:12px;display:block"></i>
      <p style="font-size:14px;color:var(--text);margin-bottom:6px">Reset all dashboard settings to default?</p>
      <p style="font-size:12px;color:var(--text3)">This will revert theme, sidebar, and filters.</p>
    </div>
  `, () => {
    setTheme(false);
    if (state.sidebarCollapsed) toggleCollapse();
    state.projectFilter = 'all';
    state.moduleFilter = 'all';
    state.projectSearch = '';
    state.page = 1;
    $$('.fpill').forEach((b, i) => i === 0 ? b.classList.add('active') : b.classList.remove('active'));
    $('#moduleFilter').value = 'all';
    $('#projectSearch').value = '';
    renderProjects();
    showToast('Dashboard reset to defaults', 'success');
    addActivity('info', 'fa-rotate-left', 'Dashboard settings reset', 'System · Settings', 'just now');
  });
});

/* ────────────────────────────────────
   INITIAL LOAD
──────────────────────────────────── */
async function init() {
  await runLoadingScreen();
  initAllCharts();
  initSparklines();
  renderProjects();
  renderTeam();
  renderPatents();
  renderEcosystem();
  renderActivity();
  // Set initial KPI static values for non-counter items
  $$('.kc-val').forEach(el => {
    if (!el.dataset.target && el.textContent.trim() === '0') {
      if (el.closest('.kc-red') && el.closest('.kc-red').querySelector('.kc-label')?.textContent.includes('Fund')) el.textContent = '₹78L';
      else if (el.closest('.kc-green') && el.closest('.kc-green').querySelector('.kc-label')?.textContent.includes('Investment')) el.textContent = '₹43L';
    }
  });
  updateNotifBadge();
}

init();