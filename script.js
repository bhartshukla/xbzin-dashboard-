/* ═══════════════════════════════════════════════════════════════
   XBzin Ecosystem — Admin Dashboard v2.0
   script.js | Full functionality | Pure JS + Chart.js
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ════════════════════════════════════
   DATA STORE
════════════════════════════════════ */
const DATA = {
  projects: [
    {id:'001',name:'AI Model Deployment v2',   module:'AI Hub',       status:'Ongoing',   priority:'High',  progress:72},
    {id:'002',name:'Web Portal Revamp',         module:'Web Services', status:'Ongoing',   priority:'High',  progress:55},
    {id:'003',name:'Toolkit API Integration',   module:'Tools',        status:'Ongoing',   priority:'Med',   progress:40},
    {id:'004',name:'Community Forum Launch',    module:'Community',    status:'Ongoing',   priority:'Med',   progress:30},
    {id:'005',name:'Patent Filing #4 Support',  module:'AI Hub',       status:'Pending',   priority:'High',  progress:10},
    {id:'006',name:'Analytics Module v3',       module:'Web Services', status:'Pending',   priority:'Med',   progress:5},
    {id:'007',name:'Security Audit FY25',       module:'Tools',        status:'Pending',   priority:'High',  progress:0},
    {id:'008',name:'Mobile App Beta',           module:'Community',    status:'Pending',   priority:'Low',   progress:0},
    {id:'009',name:'Investor Dashboard',        module:'Web Services', status:'Pending',   priority:'Med',   progress:0},
    {id:'010',name:'AI Chatbot Integration',    module:'AI Hub',       status:'Pending',   priority:'High',  progress:0},
    {id:'011',name:'E-commerce Plugin',         module:'Tools',        status:'Pending',   priority:'Low',   progress:0},
    {id:'012',name:'Newsletter System',         module:'Community',    status:'Pending',   priority:'Low',   progress:0},
    {id:'013',name:'Cloud Migration Phase 2',   module:'Web Services', status:'Pending',   priority:'High',  progress:0},
  ],

  patents: [
    {id:'PAT-001',title:'AI Inference Engine',       module:'AI Hub',       status:'granted', date:'Jan 2023', desc:'Core AI processing pipeline patent for XBzin AI Hub neural inference architecture and model serving layer.'},
    {id:'PAT-002',title:'Adaptive Web Routing',      module:'Web Services', status:'granted', date:'Jun 2023', desc:'Intelligent request-routing system with adaptive load balancing for XBzin Web Services distributed infrastructure.'},
    {id:'PAT-003',title:'Modular Toolkit Framework', module:'Tools',        status:'granted', date:'Nov 2023', desc:'Plugin-based extensible toolkit architecture enabling third-party integrations across XBzin Tools ecosystem.'},
    {id:'PAT-004',title:'Community AI Recommender',  module:'Community',    status:'pending', date:'Mar 2025', desc:'AI-driven personalized community engagement recommendation engine with real-time behavior analysis.'},
  ],

  team: [
    {name:'Bharat Shukla', role:'Founder & CEO',         dept:'Leadership',    proj:12, color:'#2563eb'},
    {name:'Aryan Mehta',   role:'CTO',                   dept:'Engineering',   proj:8,  color:'#16a34a'},
    {name:'Priya Singh',   role:'Lead AI Engineer',      dept:'AI Hub',        proj:6,  color:'#d97706'},
    {name:'Rohan Gupta',   role:'Backend Developer',     dept:'Web Services',  proj:5,  color:'#dc2626'},
    {name:'Neha Sharma',   role:'Frontend Developer',    dept:'Web Services',  proj:4,  color:'#7c3aed'},
    {name:'Amit Patel',    role:'ML Researcher',         dept:'AI Hub',        proj:7,  color:'#0891b2'},
    {name:'Kavya Rao',     role:'Product Manager',       dept:'Leadership',    proj:9,  color:'#be185d'},
    {name:'Dev Verma',     role:'DevOps Engineer',       dept:'Tools',         proj:4,  color:'#059669'},
    {name:'Sneha Jain',    role:'UX Designer',           dept:'Community',     proj:3,  color:'#ea580c'},
    {name:'Raj Sinha',     role:'Data Scientist',        dept:'AI Hub',        proj:5,  color:'#6d28d9'},
    {name:'Ananya Nair',   role:'Marketing Lead',        dept:'Community',     proj:3,  color:'#0284c7'},
    {name:'Vikram Das',    role:'Security Analyst',      dept:'Tools',         proj:2,  color:'#b45309'},
    {name:'Pooja Yadav',   role:'Community Manager',     dept:'Community',     proj:4,  color:'#0d9488'},
    {name:'Karan Bose',    role:'Full Stack Developer',  dept:'Web Services',  proj:6,  color:'#4338ca'},
    {name:'Meera Chawla',  role:'Legal & IP Counsel',    dept:'Leadership',    proj:4,  color:'#c026d3'},
    {name:'Suresh Kumar',  role:'QA Engineer',           dept:'Tools',         proj:3,  color:'#65a30d'},
  ],

  notifications: [
    {id:1, type:'success', icon:'fa-circle-check',         text:'Patent #3 successfully granted',          time:'2 hours ago',  read:false},
    {id:2, type:'warning', icon:'fa-indian-rupee-sign',    text:'Funding Round 2 report available',         time:'5 hours ago',  read:false},
    {id:3, type:'error',   icon:'fa-triangle-exclamation', text:'9 projects pending action required',       time:'1 day ago',    read:false},
  ],

  activity: [
    {icon:'fa-circle-check', color:'green', text:'AI Model v2 milestone achieved',      time:'2h ago'},
    {icon:'fa-upload',       color:'blue',  text:'Funding Round 2 docs uploaded',       time:'5h ago'},
    {icon:'fa-file-pen',     color:'yellow',text:'Patent PAT-004 submitted for review', time:'1d ago'},
    {icon:'fa-user-plus',    color:'green', text:'2 new team members onboarded',        time:'3d ago'},
    {icon:'fa-shield-halved',color:'red',   text:'Security audit scheduled next week',  time:'5d ago'},
  ],

  ecosystem: [
    {id:'ai',      name:'XBzin AI Hub',       icon:'fa-brain',                color:'blue',   status:'live',   uptime:92, patents:2, projects:5, desc:'Centralized AI inference, model management, and intelligent automation layer powering the entire XBzin ecosystem with real-time processing.',tags:'AI · ML · Inference'},
    {id:'web',     name:'XBzin Web Services', icon:'fa-globe',                color:'green',  status:'live',   uptime:88, patents:1, projects:4, desc:'Scalable web infrastructure, adaptive API gateway, intelligent routing and full-stack delivery platform for enterprise-grade applications.',tags:'Web · API · Cloud'},
    {id:'tools',   name:'XBzin Tools',        icon:'fa-screwdriver-wrench',   color:'yellow', status:'maint',  uptime:76, patents:1, projects:2, desc:'Modular developer toolkit with extensible plugins, workflow automation utilities and deep third-party integrations.',tags:'Dev · Plugins · CLI'},
    {id:'community',name:'XBzin Community',   icon:'fa-users-between-lines',  color:'red',    status:'live',   uptime:95, patents:'1(P)', projects:2, desc:'AI-powered community platform fostering collaboration, knowledge sharing, and developer networking at enterprise scale.',tags:'Community · Forums · AI'},
  ],

  settings: {
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    projectUpdates: true,
    autoRefresh: false,
    compactView: false,
    name: 'Bharat Shukla',
    email: 'bharat@xbzin.com',
    phone: '+91 98765 43210',
  }
};

let currentPage  = 'overview';
let sidebarCollapsed = false;
let sortConfig   = {col: -1, asc: true};
let projPage     = 1;
const ROWS_PER_PAGE = 8;
let filteredProjects = [...DATA.projects];
const charts = {};

/* ════════════════════════════════════
   LOADER
════════════════════════════════════ */
const LOADER_MSGS = [
  'Initializing ecosystem...',
  'Loading project data...',
  'Connecting to database...',
  'Fetching analytics...',
  'Rendering dashboard...',
];

function initLoader() {
  const fill   = document.getElementById('lpFill');
  const status = document.getElementById('loaderStatus');
  let pct = 0, msgIdx = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 18 + 4;
    if (pct > 100) pct = 100;
    fill.style.width = pct + '%';
    if (pct > msgIdx * 20 && msgIdx < LOADER_MSGS.length) {
      status.textContent = LOADER_MSGS[msgIdx++];
    }
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        document.getElementById('loaderScreen').classList.add('hidden');
        initDashboard();
      }, 400);
    }
  }, 120);
}

/* ════════════════════════════════════
   INIT
════════════════════════════════════ */
function initDashboard() {
  initChartDefaults();
  initSidebar();
  initTopbar();
  initSearch();
  initNotifications();
  initLiveClock();
  initKPICounters();
  buildActivityFeed();
  buildHealthList();
  buildTeamGrid();
  buildEcoGrid();
  buildPatentCards();
  buildProjectsTable();
  buildSettingsPage();
  initCharts();
  initKPIBars();
  showToast('XBzin Dashboard loaded successfully!', 'success');
}

/* ════════════════════════════════════
   CHART DEFAULTS
════════════════════════════════════ */
function initChartDefaults() {
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.font.size   = 12;
  Chart.defaults.color       = getComputedStyle(document.body).getPropertyValue('--text2') || '#475569';
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = '#0f172a';
  Chart.defaults.plugins.tooltip.titleColor = '#f1f5f9';
  Chart.defaults.plugins.tooltip.bodyColor   = '#94a3b8';
  Chart.defaults.plugins.tooltip.padding     = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
}

const C = { blue:'#2563eb', green:'#16a34a', yellow:'#d97706', red:'#dc2626', black:'#0f172a' };

/* ════════════════════════════════════
   ALL CHARTS
════════════════════════════════════ */
function initCharts() {
  buildProjLineChart(12);
  buildProjDonutChart();
  buildProjBarChart();
  buildProjModuleChart();
  buildFundBarChart();
  buildInvestLineChart();
  buildPatPieChart();
  buildRevenueChart(6);
  buildTeamChart(6);
  buildRadarChart();
}

function buildProjLineChart(months) {
  const ctx = document.getElementById('projLineChart');
  if (!ctx) return;
  if (charts.projLine) charts.projLine.destroy();
  const labels = getLast(months,'month');
  const data   = genData(months, 8, 16);
  charts.projLine = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label:'Projects Delivered',
        data,
        borderColor: C.blue,
        backgroundColor: 'rgba(37,99,235,.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: C.blue,
        borderWidth: 2.5,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { grid:{ display:false }, border:{ display:false } },
        y: { beginAtZero:true, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false }, ticks:{ stepSize:4 } }
      },
      plugins: { legend:{ display:false } },
      animation: { duration: 800 }
    }
  });
}

function buildProjDonutChart() {
  const ctx = document.getElementById('projDonutChart');
  if (!ctx) return;
  if (charts.projDonut) charts.projDonut.destroy();
  charts.projDonut = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels:['Completed','Ongoing','Pending'],
      datasets:[{ data:[129,4,9], backgroundColor:[C.green,C.yellow,C.red], borderWidth:3, borderColor:'#ffffff', hoverOffset:8 }]
    },
    options: {
      cutout:'72%', responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ display:false }, tooltip:{ callbacks:{ label:ctx=>`${ctx.label}: ${ctx.raw}` } } },
      animation:{ animateScale:true, duration:900 }
    }
  });
}

function buildProjBarChart() {
  const ctx = document.getElementById('projBarChart');
  if (!ctx) return;
  if (charts.projBar) charts.projBar.destroy();
  charts.projBar = new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Completed','Ongoing','Pending'],
      datasets:[{ data:[129,4,9], backgroundColor:[C.green,C.yellow,C.red], borderRadius:10, borderSkipped:false, maxBarThickness:60 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{ grid:{ display:false }, border:{ display:false } },
        y:{ beginAtZero:true, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false } }
      },
      plugins:{ legend:{ display:false } },
      animation:{ duration:800 }
    }
  });
}

function buildProjModuleChart() {
  const ctx = document.getElementById('projModuleChart');
  if (!ctx) return;
  if (charts.projModule) charts.projModule.destroy();
  charts.projModule = new Chart(ctx, {
    type:'bar',
    data:{
      labels:['AI Hub','Web Services','Tools','Community'],
      datasets:[
        { label:'Completed', data:[35,40,30,24], backgroundColor:C.green, borderRadius:6, borderSkipped:false },
        { label:'Ongoing',   data:[2,1,1,0],     backgroundColor:C.yellow, borderRadius:6, borderSkipped:false },
        { label:'Pending',   data:[3,3,2,1],     backgroundColor:C.red,   borderRadius:6, borderSkipped:false },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{ stacked:true, grid:{ display:false }, border:{ display:false } },
        y:{ stacked:true, beginAtZero:true, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false } }
      },
      plugins:{ legend:{ display:true, position:'bottom', labels:{ boxWidth:10, padding:16 } } },
      animation:{ duration:800 }
    }
  });
}

function buildFundBarChart() {
  const ctx = document.getElementById('fundBarChart');
  if (!ctx) return;
  if (charts.fundBar) charts.fundBar.destroy();
  charts.fundBar = new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Round 1 (Seed)','Round 2 (Series A)'],
      datasets:[{ data:[16,19], backgroundColor:[C.blue,C.green], borderRadius:12, borderSkipped:false, maxBarThickness:70 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{ grid:{ display:false }, border:{ display:false } },
        y:{ beginAtZero:true, max:25, ticks:{ callback:v=>`₹${v}L` }, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false } }
      },
      plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:ctx=>`₹${ctx.raw} Lakhs` } } },
      animation:{ duration:800 }
    }
  });
}

function buildInvestLineChart() {
  const ctx = document.getElementById('investLineChart');
  if (!ctx) return;
  if (charts.investLine) charts.investLine.destroy();
  charts.investLine = new Chart(ctx, {
    type:'line',
    data:{
      labels:['Q1 FY24','Q2 FY24','Q3 FY24','Q4 FY24','Q1 FY25','Q2 FY25'],
      datasets:[
        { label:'Total Investment (₹L)', data:[10,20,30,38,43,43], borderColor:C.blue, backgroundColor:'rgba(37,99,235,.06)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:C.blue, borderWidth:2.5 },
        { label:'Fund Utilized (₹L)',    data:[12,28,45,62,73,78], borderColor:C.red,  backgroundColor:'rgba(220,38,38,.05)',  fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:C.red,  borderWidth:2.5 },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      scales:{
        x:{ grid:{ display:false }, border:{ display:false } },
        y:{ beginAtZero:true, ticks:{ callback:v=>`₹${v}L` }, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false } }
      },
      plugins:{ legend:{ display:true, position:'bottom', labels:{ boxWidth:10, padding:16 } }, tooltip:{ callbacks:{ label:ctx=>`${ctx.dataset.label}: ₹${ctx.raw}L` } } },
      animation:{ duration:900 }
    }
  });
}

function buildPatPieChart() {
  const ctx = document.getElementById('patPieChart');
  if (!ctx) return;
  if (charts.patPie) charts.patPie.destroy();
  charts.patPie = new Chart(ctx, {
    type:'doughnut',
    data:{
      labels:['Granted','Pending'],
      datasets:[{ data:[3,1], backgroundColor:[C.green,C.yellow], borderWidth:3, borderColor:'#ffffff', hoverOffset:6 }]
    },
    options:{
      cutout:'68%', responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      animation:{ animateScale:true, duration:800 }
    }
  });
}

function buildRevenueChart(months) {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;
  if (charts.revenue) charts.revenue.destroy();
  const labels = getLast(months, 'month');
  charts.revenue = new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[{ label:'Revenue (₹L)', data:genData(months,5,18), borderColor:C.green, backgroundColor:'rgba(22,163,74,.08)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:C.green, borderWidth:2.5 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{ grid:{ display:false }, border:{ display:false } },
        y:{ beginAtZero:true, ticks:{ callback:v=>`₹${v}L` }, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false } }
      },
      plugins:{ legend:{ display:false } },
      animation:{ duration:800 }
    }
  });
}

function buildTeamChart(months) {
  const ctx = document.getElementById('teamChart');
  if (!ctx) return;
  if (charts.team) charts.team.destroy();
  const labels = getLast(months, 'month');
  const base = [8,9,10,11,14,16];
  charts.team = new Chart(ctx, {
    type:'bar',
    data:{
      labels,
      datasets:[{ label:'Headcount', data:base.slice(-months), backgroundColor:C.blue, borderRadius:8, borderSkipped:false }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{ grid:{ display:false }, border:{ display:false } },
        y:{ beginAtZero:true, ticks:{ stepSize:2 }, grid:{ color:'rgba(0,0,0,.04)' }, border:{ display:false } }
      },
      plugins:{ legend:{ display:false } },
      animation:{ duration:800 }
    }
  });
}

function buildRadarChart() {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  if (charts.radar) charts.radar.destroy();
  charts.radar = new Chart(ctx, {
    type:'radar',
    data:{
      labels:['Innovation','Delivery','Team Health','Financial','IP Portfolio','Community'],
      datasets:[
        { label:'AI Hub',      data:[95,88,82,75,90,70], borderColor:C.blue,   backgroundColor:'rgba(37,99,235,.1)',  borderWidth:2, pointBackgroundColor:C.blue   },
        { label:'Web Services',data:[80,92,85,80,75,65], borderColor:C.green,  backgroundColor:'rgba(22,163,74,.1)',  borderWidth:2, pointBackgroundColor:C.green  },
        { label:'Tools',       data:[75,70,78,60,70,55], borderColor:C.yellow, backgroundColor:'rgba(217,119,6,.1)',  borderWidth:2, pointBackgroundColor:C.yellow },
        { label:'Community',   data:[85,75,88,65,60,95], borderColor:C.red,    backgroundColor:'rgba(220,38,38,.1)',  borderWidth:2, pointBackgroundColor:C.red    },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{ r:{ beginAtZero:true, max:100, ticks:{ stepSize:25, font:{ size:10 } }, grid:{ color:'rgba(0,0,0,.06)' }, pointLabels:{ font:{ size:12, weight:600 } } } },
      plugins:{ legend:{ display:true, position:'bottom', labels:{ boxWidth:10, padding:16 } } },
      animation:{ duration:900 }
    }
  });
}

/* update proj line chart from filter */
function updateProjLine(months) { buildProjLineChart(parseInt(months)); }
function updateAnalytics(months) {
  buildRevenueChart(parseInt(months));
  buildTeamChart(parseInt(months));
}

/* ════════════════════════════════════
   SIDEBAR
════════════════════════════════════ */
function initSidebar() {
  const colBtn  = document.getElementById('sbCollapseBtn');
  const ham     = document.getElementById('hamburger');
  const overlay = document.getElementById('sbOverlay');
  const links   = document.querySelectorAll('.sb-link[data-page]');

  colBtn.addEventListener('click', () => {
    sidebarCollapsed = !sidebarCollapsed;
    document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
    document.getElementById('mainWrap').classList.toggle('expanded', sidebarCollapsed);
    colBtn.querySelector('i').style.transform = sidebarCollapsed ? 'rotate(180deg)' : '';
  });

  ham.addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sb.classList.toggle('mobile-open');
      overlay.classList.toggle('show');
    } else {
      sidebarCollapsed = !sidebarCollapsed;
      sb.classList.toggle('collapsed', sidebarCollapsed);
      document.getElementById('mainWrap').classList.toggle('expanded', sidebarCollapsed);
    }
  });

  overlay.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('mobile-open');
    overlay.classList.remove('show');
  });

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.page);
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('mobile-open');
        overlay.classList.remove('show');
      }
    });
  });

  // Sidebar search filter
  document.getElementById('sbSearch').addEventListener('input', function () {
    const q = this.value.toLowerCase();
    document.querySelectorAll('.sb-link').forEach(l => {
      const txt = l.querySelector('.sbl-tx');
      if (!txt) return;
      l.style.display = txt.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

/* ════════════════════════════════════
   NAVIGATION
════════════════════════════════════ */
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  const link = document.querySelector(`.sb-link[data-page="${page}"]`);
  if (link) link.classList.add('active');

  const labels = {
    overview:'Overview', projects:'Projects', funding:'Funding', patents:'Patents',
    ecosystem:'Modules', analytics:'Analytics', team:'Team', settings:'Settings', reports:'Reports'
  };
  document.getElementById('bcPage').textContent = labels[page] || page;
  currentPage = page;

  // Lazy init per-page things
  if (page === 'settings') renderSettings('general');
  if (page === 'analytics') setTimeout(() => { buildRevenueChart(6); buildTeamChart(6); buildRadarChart(); }, 50);

  window.scrollTo(0,0);
}

/* ════════════════════════════════════
   TOPBAR
════════════════════════════════════ */
function initTopbar() {
  // Theme
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);

  // Notifications
  document.getElementById('notifBtn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('notifPanel').classList.toggle('open');
    document.getElementById('profileMenu').classList.remove('open');
    document.getElementById('gs-results') && document.getElementById('gsResults').classList.remove('open');
    document.querySelector('.profile-wrap') && document.querySelector('.profile-wrap').classList.remove('open');
  });

  // Profile
  document.getElementById('profileBtn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('profileMenu').classList.toggle('open');
    document.querySelector('.profile-wrap').classList.toggle('open');
    document.getElementById('notifPanel').classList.remove('open');
  });

  document.addEventListener('click', () => {
    document.getElementById('notifPanel').classList.remove('open');
    document.getElementById('profileMenu').classList.remove('open');
    document.querySelector('.profile-wrap') && document.querySelector('.profile-wrap').classList.remove('open');
  });
}

/* ════════════════════════════════════
   GLOBAL SEARCH
════════════════════════════════════ */
function initSearch() {
  const input   = document.getElementById('gsInput');
  const results = document.getElementById('gsResults');

  const searchItems = [
    ...DATA.projects.map(p => ({ label:p.name, sub:p.module, icon:'fa-diagram-project', page:'projects' })),
    ...DATA.patents.map(p  => ({ label:p.title, sub:p.module, icon:'fa-file-shield', page:'patents' })),
    { label:'Overview Dashboard', sub:'Main',    icon:'fa-gauge-high',    page:'overview' },
    { label:'Team Management',    sub:'HR',      icon:'fa-users',         page:'team' },
    { label:'Funding & Investment',sub:'Finance',icon:'fa-sack-dollar',   page:'funding' },
    { label:'Analytics',          sub:'Reports', icon:'fa-chart-mixed',   page:'analytics' },
    { label:'Settings',           sub:'System',  icon:'fa-gear',          page:'settings' },
    { label:'Reports',            sub:'Export',  icon:'fa-file-chart-column', page:'reports' },
  ];

  input.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    if (!q) { results.classList.remove('open'); return; }
    const found = searchItems.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q));
    if (!found.length) { results.innerHTML = `<div class="gsr-item"><i class="fa-solid fa-search-minus"></i> No results found</div>`; results.classList.add('open'); return; }
    results.innerHTML = `<div class="gsr-cat">Results</div>` + found.slice(0,6).map(i =>
      `<div class="gsr-item" onclick="navigateTo('${i.page}');document.getElementById('gsInput').value='';document.getElementById('gsResults').classList.remove('open')">
         <i class="fa-solid ${i.icon}"></i><span>${i.label} <small style="color:var(--text3)">— ${i.sub}</small></span>
       </div>`
    ).join('');
    results.classList.add('open');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.value=''; results.classList.remove('open'); }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.gsearch')) results.classList.remove('open'); });

  // CMD+K shortcut
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); input.focus(); }
  });
}

/* ════════════════════════════════════
   NOTIFICATIONS
════════════════════════════════════ */
function initNotifications() {
  renderNotifications();
}

function renderNotifications() {
  const body  = document.getElementById('npBody');
  const badge = document.getElementById('nBadge');
  const unread = DATA.notifications.filter(n => !n.read);
  badge.textContent = unread.length;
  badge.style.display = unread.length ? '' : 'none';

  body.innerHTML = DATA.notifications.map(n => `
    <div class="ni ${n.read ? '' : 'unread'}" id="ni-${n.id}">
      <div class="ni-ic ${n.type}"><i class="fa-solid ${n.icon}"></i></div>
      <div class="ni-body">
        <p class="ni-text">${n.text}</p>
        <p class="ni-time">${n.time}</p>
      </div>
      <button class="ni-x" onclick="dismissNotif(${n.id})"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `).join('');
}

function dismissNotif(id) {
  DATA.notifications = DATA.notifications.filter(n => n.id !== id);
  renderNotifications();
  showToast('Notification dismissed', 'info');
}

function markAllNotifs() {
  DATA.notifications.forEach(n => n.read = true);
  renderNotifications();
  showToast('All notifications marked as read', 'success');
}

/* ════════════════════════════════════
   LIVE CLOCK
════════════════════════════════════ */
function initLiveClock() {
  function tick() {
    const now = new Date();
    const str = now.toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' });
    const lv  = document.getElementById('liveTime');
    const fv  = document.getElementById('footerClock');
    if (lv) lv.textContent = str;
    if (fv) fv.textContent = str;
  }
  tick();
  setInterval(tick, 1000);
}

/* ════════════════════════════════════
   KPI COUNTER ANIMATION
════════════════════════════════════ */
function initKPICounters() {
  const els = document.querySelectorAll('[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      let cur = 0;
      const dur = 1200;
      const step = target / (dur / 16);
      const iv = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(iv); }
        el.textContent = Math.floor(cur).toLocaleString();
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

/* KPI bar animation */
function initKPIBars() {
  const bars = document.querySelectorAll('.kc-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = 'var(--p)';
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.style.width = '0'; obs.observe(b); });
}

/* ════════════════════════════════════
   ACTIVITY FEED
════════════════════════════════════ */
function buildActivityFeed() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  feed.innerHTML = DATA.activity.map(a => `
    <div class="act-item">
      <div class="act-ic ${a.color}"><i class="fa-solid ${a.icon}"></i></div>
      <div>
        <p class="act-text">${a.text}</p>
        <p class="act-time">${a.time}</p>
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════
   ECOSYSTEM HEALTH LIST
════════════════════════════════════ */
function buildHealthList() {
  const el = document.getElementById('healthList');
  if (!el) return;
  const items = [
    { name:'XBzin AI Hub',      icon:'fa-brain',                color:'blue',   uptime:92, status:'Operational', st:'green' },
    { name:'Web Services',       icon:'fa-globe',                color:'green',  uptime:88, status:'Operational', st:'green' },
    { name:'XBzin Tools',        icon:'fa-screwdriver-wrench',   color:'yellow', uptime:76, status:'Maintenance',  st:'yellow' },
    { name:'Community Platform', icon:'fa-users-between-lines',  color:'red',    uptime:95, status:'Operational', st:'green' },
  ];
  el.innerHTML = items.map(i => `
    <div class="hl-item">
      <div class="hl-icon ${i.color}-wrap"><i class="fa-solid ${i.icon}"></i></div>
      <div><p class="hl-name">${i.name}</p><p class="hl-status ${i.st}">${i.status}</p></div>
      <div class="hl-bar-wrap">
        <div class="hl-bar"><div class="hl-fill ${i.color}-fill" style="--p:${i.uptime}%"></div></div>
        <span class="hl-pct">${i.uptime}%</span>
      </div>
    </div>
  `).join('');
  // animate bars
  setTimeout(() => {
    el.querySelectorAll('.hl-fill').forEach(b => { b.style.width = 'var(--p)'; });
  }, 400);
}

/* ════════════════════════════════════
   TEAM GRID
════════════════════════════════════ */
function buildTeamGrid() {
  const el = document.getElementById('teamGrid');
  if (!el) return;
  el.innerHTML = DATA.team.map(m => {
    const initials = m.name.split(' ').map(w=>w[0]).join('').slice(0,2);
    return `
    <div class="team-card">
      <div class="tm-avatar" style="background:${m.color}">${initials}</div>
      <p class="tm-name">${m.name}</p>
      <p class="tm-role">${m.role}</p>
      <span class="tm-dept" style="background:${m.color}18;color:${m.color}">${m.dept}</span>
      <div class="tm-meta">
        <span><i class="fa-solid fa-diagram-project"></i> ${m.proj} Projects</span>
      </div>
    </div>`;
  }).join('');
}

/* ════════════════════════════════════
   ECOSYSTEM GRID
════════════════════════════════════ */
function buildEcoGrid() {
  const el = document.getElementById('ecoGrid');
  if (!el) return;
  el.innerHTML = DATA.ecosystem.map(eco => `
    <div class="eco-card" onclick="showEcoDetails('${eco.id}')">
      <div class="eco-card-top">
        <div class="eco-icon ${eco.color}-wrap"><i class="fa-solid ${eco.icon}"></i></div>
        <div class="eco-live ${eco.status === 'live' ? 'live' : 'maint'}">
          <span class="pulse-dot ${eco.status === 'live' ? 'green' : 'yellow'}-pulse"></span>
          ${eco.status === 'live' ? 'Live' : 'Maintenance'}
        </div>
      </div>
      <p class="eco-name">${eco.name}</p>
      <p class="eco-desc">${eco.desc}</p>
      <div class="eco-stats">
        <div class="es-item"><span class="es-val">${eco.patents}</span><span class="es-lbl">Patents</span></div>
        <div class="es-item"><span class="es-val">${eco.uptime}%</span><span class="es-lbl">Uptime</span></div>
        <div class="es-item"><span class="es-val">${eco.projects}</span><span class="es-lbl">Projects</span></div>
      </div>
      <div class="eco-bar"><div class="eb-fill ${eco.color}-fill" style="--p:${eco.uptime}%"></div></div>
      <div class="eco-foot">
        <div class="eco-tags"><span>${eco.tags}</span></div>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  `).join('');
  setTimeout(() => {
    el.querySelectorAll('.eb-fill').forEach(b => b.style.width = 'var(--p)');
  }, 300);
}

function showEcoDetails(id) {
  const eco = DATA.ecosystem.find(e => e.id === id);
  if (!eco) return;
  openModal(`${eco.name} — Details`,
    `<div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center">
        <div style="padding:14px;background:var(--bg);border-radius:10px"><strong style="font-size:22px;display:block">${eco.patents}</strong><span style="font-size:12px;color:var(--text3)">Patents</span></div>
        <div style="padding:14px;background:var(--bg);border-radius:10px"><strong style="font-size:22px;display:block">${eco.uptime}%</strong><span style="font-size:12px;color:var(--text3)">Uptime</span></div>
        <div style="padding:14px;background:var(--bg);border-radius:10px"><strong style="font-size:22px;display:block">${eco.projects}</strong><span style="font-size:12px;color:var(--text3)">Projects</span></div>
      </div>
      <p style="font-size:14px;color:var(--text2);line-height:1.7">${eco.desc}</p>
      <p style="font-size:12px;color:var(--text3)">Status: <strong style="color:var(--green)">${eco.status === 'live' ? 'Operational' : 'Under Maintenance'}</strong></p>
    </div>`,
    false
  );
}

/* ════════════════════════════════════
   PATENT CARDS
════════════════════════════════════ */
function buildPatentCards() {
  const el = document.getElementById('patentCards');
  if (!el) return;
  el.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:16px';
  el.innerHTML = DATA.patents.map(p => `
    <div class="pat-card ${p.status}">
      <div class="pc-hdr">
        <span class="pc-id">${p.id}</span>
        <span class="pc-sbadge ${p.status}">${p.status === 'granted' ? 'Granted' : 'Pending'}</span>
      </div>
      <div class="pc-icon"><i class="fa-solid ${getPatentIcon(p.id)}"></i></div>
      <h4 class="pc-title">${p.title}</h4>
      <p class="pc-desc">${p.desc}</p>
      <div class="pc-foot">
        <span><i class="fa-solid fa-calendar"></i> ${p.date}</span>
        <button class="btn-link" onclick="showPatentDetails(${DATA.patents.indexOf(p)})">View Details →</button>
      </div>
    </div>
  `).join('');
}

function getPatentIcon(id) {
  const map = {'PAT-001':'fa-brain','PAT-002':'fa-network-wired','PAT-003':'fa-screwdriver-wrench','PAT-004':'fa-users-between-lines'};
  return map[id] || 'fa-file-shield';
}

function showPatentDetails(idx) {
  const p = DATA.patents[idx];
  openModal(`Patent ${p.id} — Details`,
    `<div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace;color:var(--text3)">${p.id}</span>
        <span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:${p.status==='granted'?'var(--green-lt)':'var(--yellow-lt)'};color:${p.status==='granted'?'var(--green)':'var(--yellow)'}">${p.status === 'granted' ? 'Granted' : 'Pending'}</span>
      </div>
      <h4 style="font-size:16px;font-weight:800;color:var(--text)">${p.title}</h4>
      <p style="font-size:13.5px;color:var(--text2);line-height:1.7">${p.desc}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="padding:12px;background:var(--bg);border-radius:9px"><p style="font-size:11px;color:var(--text3)">Module</p><p style="font-size:13px;font-weight:700">${p.module}</p></div>
        <div style="padding:12px;background:var(--bg);border-radius:9px"><p style="font-size:11px;color:var(--text3)">Filed / Granted</p><p style="font-size:13px;font-weight:700">${p.date}</p></div>
      </div>
    </div>`,
    false
  );
}

/* ════════════════════════════════════
   PROJECTS TABLE
════════════════════════════════════ */
function buildProjectsTable() {
  filteredProjects = [...DATA.projects];
  projPage = 1;
  renderProjectsTable();
}

function filterProjects() {
  const q      = (document.getElementById('projSearch')?.value || '').toLowerCase();
  const status = document.getElementById('projStatusFilter')?.value || 'all';
  const module = document.getElementById('projModuleFilter')?.value || 'all';

  filteredProjects = DATA.projects.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.module.toLowerCase().includes(q);
    const matchS = status === 'all' || p.status === status;
    const matchM = module === 'all' || p.module.includes(module);
    return matchQ && matchS && matchM;
  });
  projPage = 1;
  renderProjectsTable();
}

function sortTable(colIdx) {
  if (sortConfig.col === colIdx) sortConfig.asc = !sortConfig.asc;
  else { sortConfig.col = colIdx; sortConfig.asc = true; }

  const keys = ['id','name','module','status','priority','progress'];
  const key  = keys[colIdx];
  filteredProjects.sort((a,b) => {
    const av = a[key], bv = b[key];
    if (typeof av === 'number') return sortConfig.asc ? av - bv : bv - av;
    return sortConfig.asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });
  renderProjectsTable();
}

function renderProjectsTable() {
  const tbody  = document.getElementById('projTbody');
  const info   = document.getElementById('projInfo');
  const pgDiv  = document.getElementById('projPagination');
  const count  = document.getElementById('tcCount');
  if (!tbody) return;

  const total = filteredProjects.length;
  const pages = Math.ceil(total / ROWS_PER_PAGE);
  const start = (projPage - 1) * ROWS_PER_PAGE;
  const slice = filteredProjects.slice(start, start + ROWS_PER_PAGE);

  if (count) count.textContent = total;
  if (info)  info.textContent  = `Showing ${start+1}–${Math.min(start+ROWS_PER_PAGE,total)} of ${total}`;

  tbody.innerHTML = slice.map(p => {
    const sc = p.status === 'Completed' ? 's-completed' : p.status === 'Ongoing' ? 's-ongoing' : 's-pending';
    const pc = p.priority === 'High' ? 'p-high' : p.priority === 'Med' ? 'p-med' : 'p-low';
    const pfClr = p.status === 'Completed' ? 'var(--green)' : p.status === 'Ongoing' ? 'var(--yellow)' : 'var(--red)';
    return `
    <tr>
      <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text3)">${p.id}</td>
      <td style="font-weight:600;color:var(--text)">${p.name}</td>
      <td><span class="mod-tag"><i class="fa-solid ${moduleIcon(p.module)}"></i>${p.module}</span></td>
      <td><span class="status-badge ${sc}">${p.status}</span></td>
      <td><span class="pri-badge ${pc}">${p.priority}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-mini"><div class="pm-fill" style="width:${p.progress}%;background:${pfClr}"></div></div>
          <span style="font-size:11px;font-weight:700;color:var(--text2);min-width:28px">${p.progress}%</span>
        </div>
      </td>
      <td>
        <div class="action-btns">
          <button class="act-btn edit" onclick="editProject('${p.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="act-btn del"  onclick="deleteProject('${p.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');

  // Pagination
  if (pgDiv) {
    pgDiv.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');
      btn.className = `pg-btn${i === projPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.onclick = () => { projPage = i; renderProjectsTable(); };
      pgDiv.appendChild(btn);
    }
  }
}

function moduleIcon(mod) {
  const map = {'AI Hub':'fa-brain','Web Services':'fa-globe','Tools':'fa-screwdriver-wrench','Community':'fa-users-between-lines'};
  return map[mod] || 'fa-cube';
}

function editProject(id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p) return;
  openModal(`Edit Project ${p.id}`,
    `<div class="form-group"><label class="form-label">Project Name</label><input class="form-input" id="ep-name" value="${p.name}"/></div>
     <div class="form-grid">
       <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="ep-status"><option ${p.status==='Ongoing'?'selected':''}>Ongoing</option><option ${p.status==='Pending'?'selected':''}>Pending</option><option ${p.status==='Completed'?'selected':''}>Completed</option></select></div>
       <div class="form-group"><label class="form-label">Priority</label><select class="form-select" id="ep-priority"><option value="High" ${p.priority==='High'?'selected':''}>High</option><option value="Med" ${p.priority==='Med'?'selected':''}>Medium</option><option value="Low" ${p.priority==='Low'?'selected':''}>Low</option></select></div>
     </div>
     <div class="form-group"><label class="form-label">Progress (${p.progress}%)</label><input type="range" class="sett-input" id="ep-progress" min="0" max="100" value="${p.progress}" oninput="this.previousElementSibling.textContent='Progress ('+this.value+'%)'"/></div>`,
    true,
    () => {
      p.name     = document.getElementById('ep-name').value;
      p.status   = document.getElementById('ep-status').value;
      p.priority = document.getElementById('ep-priority').value;
      p.progress = parseInt(document.getElementById('ep-progress').value);
      renderProjectsTable();
      showToast(`Project ${p.id} updated successfully`, 'success');
    }
  );
}

function deleteProject(id) {
  openModal('Confirm Delete',
    `<p>Are you sure you want to delete project <strong>${id}</strong>? This action cannot be undone.</p>`,
    true,
    () => {
      const idx = DATA.projects.findIndex(x => x.id === id);
      if (idx > -1) DATA.projects.splice(idx, 1);
      buildProjectsTable();
      showToast(`Project ${id} deleted`, 'error');
    }
  );
}

function showAddProjectModal() {
  openModal('Add New Project',
    `<div class="form-group"><label class="form-label">Project Name</label><input class="form-input" id="np-name" placeholder="Enter project name..."/></div>
     <div class="form-grid">
       <div class="form-group"><label class="form-label">Module</label><select class="form-select" id="np-module"><option>AI Hub</option><option>Web Services</option><option>Tools</option><option>Community</option></select></div>
       <div class="form-group"><label class="form-label">Priority</label><select class="form-select" id="np-priority"><option value="High">High</option><option value="Med">Medium</option><option value="Low">Low</option></select></div>
     </div>
     <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="np-desc" placeholder="Brief project description..."></textarea></div>`,
    true,
    () => {
      const name = document.getElementById('np-name').value.trim();
      if (!name) { showToast('Please enter a project name','error'); return; }
      const newId = String(DATA.projects.length + 1).padStart(3,'0');
      DATA.projects.push({ id:newId, name, module:document.getElementById('np-module').value, status:'Pending', priority:document.getElementById('np-priority').value, progress:0 });
      buildProjectsTable();
      showToast(`Project ${newId} added successfully!`, 'success');
    }
  );
}

/* ════════════════════════════════════
   PATENT MODAL
════════════════════════════════════ */
function showAddPatentModal() {
  openModal('File New Patent',
    `<div class="form-group"><label class="form-label">Patent Title</label><input class="form-input" id="npa-title" placeholder="Enter patent title..."/></div>
     <div class="form-grid">
       <div class="form-group"><label class="form-label">Module</label><select class="form-select" id="npa-module"><option>AI Hub</option><option>Web Services</option><option>Tools</option><option>Community</option></select></div>
       <div class="form-group"><label class="form-label">Filing Date</label><input type="date" class="form-input" id="npa-date"/></div>
     </div>
     <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="npa-desc" placeholder="Detailed patent description..."></textarea></div>`,
    true,
    () => {
      const title = document.getElementById('npa-title').value.trim();
      if (!title) { showToast('Please enter a patent title','error'); return; }
      const newId = `PAT-00${DATA.patents.length+1}`;
      DATA.patents.push({ id:newId, title, module:document.getElementById('npa-module').value, status:'pending', date:'Pending', desc:document.getElementById('npa-desc').value });
      buildPatentCards();
      showToast(`Patent ${newId} filed for review!`, 'success');
    }
  );
}

/* ════════════════════════════════════
   SETTINGS
════════════════════════════════════ */
function buildSettingsPage() {
  document.querySelectorAll('.stab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      renderSettings(this.dataset.tab);
    });
  });
}

function renderSettings(tab) {
  const body = document.getElementById('settingsBody');
  if (!body) return;
  const s = DATA.settings;

  const templates = {
    general: `
      <div class="sett-section">
        <h3 class="sett-title">Personal Information</h3>
        <p class="sett-desc">Update your personal details and contact information.</p>
        <div class="form-group"><label class="form-label">Full Name</label><input class="sett-input" id="s-name" value="${s.name}"/></div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Email Address</label><input class="sett-input" id="s-email" value="${s.email}"/></div>
          <div class="form-group"><label class="form-label">Phone Number</label><input class="sett-input" id="s-phone" value="${s.phone}"/></div>
        </div>
        <div class="sett-actions">
          <button class="btn b-primary" onclick="saveGeneralSettings()"><i class="fa-solid fa-floppy-disk"></i> Save Changes</button>
          <button class="btn b-ghost" onclick="showToast('Changes discarded','info')">Discard</button>
        </div>
      </div>`,

    appearance: `
      <div class="sett-section">
        <h3 class="sett-title">Theme & Display</h3>
        <p class="sett-desc">Customize how the dashboard looks and feels.</p>
        <div class="sett-row">
          <div><p class="sett-row-label">Dark Mode</p><p class="sett-row-sub">Toggle between light and dark theme</p></div>
          <label class="toggle-switch"><input type="checkbox" ${document.documentElement.getAttribute('data-theme')==='dark'?'checked':''} onchange="toggleTheme()"/><div class="toggle-track"></div></label>
        </div>
        <div class="sett-row">
          <div><p class="sett-row-label">Compact View</p><p class="sett-row-sub">Reduce spacing for more data density</p></div>
          <label class="toggle-switch"><input type="checkbox" ${s.compactView?'checked':''} onchange="DATA.settings.compactView=this.checked;showToast('Compact view '+( this.checked?'enabled':'disabled'),'info')"/><div class="toggle-track"></div></label>
        </div>
        <div class="sett-row">
          <div><p class="sett-row-label">Auto Refresh</p><p class="sett-row-sub">Automatically refresh data every 30 seconds</p></div>
          <label class="toggle-switch"><input type="checkbox" ${s.autoRefresh?'checked':''} onchange="DATA.settings.autoRefresh=this.checked;showToast('Auto refresh '+( this.checked?'enabled':'disabled'),'info')"/><div class="toggle-track"></div></label>
        </div>
      </div>`,

    notifications: `
      <div class="sett-section">
        <h3 class="sett-title">Notification Preferences</h3>
        <p class="sett-desc">Control which notifications you receive and how.</p>
        <div class="sett-row">
          <div><p class="sett-row-label">Push Notifications</p><p class="sett-row-sub">In-dashboard alerts and updates</p></div>
          <label class="toggle-switch"><input type="checkbox" ${s.notifications?'checked':''} onchange="DATA.settings.notifications=this.checked;showToast('Push notifications '+( this.checked?'enabled':'disabled'),'info')"/><div class="toggle-track"></div></label>
        </div>
        <div class="sett-row">
          <div><p class="sett-row-label">Email Alerts</p><p class="sett-row-sub">Receive important updates via email</p></div>
          <label class="toggle-switch"><input type="checkbox" ${s.emailAlerts?'checked':''} onchange="DATA.settings.emailAlerts=this.checked;showToast('Email alerts '+( this.checked?'enabled':'disabled'),'info')"/><div class="toggle-track"></div></label>
        </div>
        <div class="sett-row">
          <div><p class="sett-row-label">Project Updates</p><p class="sett-row-sub">Notifications when project status changes</p></div>
          <label class="toggle-switch"><input type="checkbox" ${s.projectUpdates?'checked':''} onchange="DATA.settings.projectUpdates=this.checked;showToast('Project updates '+( this.checked?'enabled':'disabled'),'info')"/><div class="toggle-track"></div></label>
        </div>
      </div>`,

    security: `
      <div class="sett-section">
        <h3 class="sett-title">Security Settings</h3>
        <p class="sett-desc">Manage your account security and access controls.</p>
        <div class="form-group"><label class="form-label">Current Password</label><input type="password" class="sett-input" placeholder="Enter current password"/></div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">New Password</label><input type="password" class="sett-input" placeholder="New password"/></div>
          <div class="form-group"><label class="form-label">Confirm Password</label><input type="password" class="sett-input" placeholder="Confirm new password"/></div>
        </div>
        <div class="sett-actions">
          <button class="btn b-primary" onclick="showToast('Password updated successfully!','success')"><i class="fa-solid fa-lock"></i> Update Password</button>
        </div>
        <hr style="border:none;border-top:1px solid var(--border);margin:24px 0"/>
        <div class="sett-row">
          <div><p class="sett-row-label">Two-Factor Authentication</p><p class="sett-row-sub">Add an extra layer of security</p></div>
          <label class="toggle-switch"><input type="checkbox" onchange="showToast('2FA '+( this.checked?'enabled':'disabled'),'success')"/><div class="toggle-track"></div></label>
        </div>
        <div class="sett-row">
          <div><p class="sett-row-label">Session Timeout</p><p class="sett-row-sub">Auto logout after 30 minutes of inactivity</p></div>
          <label class="toggle-switch"><input type="checkbox" checked onchange="showToast('Session timeout '+( this.checked?'enabled':'disabled'),'info')"/><div class="toggle-track"></div></label>
        </div>
      </div>`,
  };
  body.innerHTML = templates[tab] || '';
}

function saveGeneralSettings() {
  DATA.settings.name  = document.getElementById('s-name')?.value  || DATA.settings.name;
  DATA.settings.email = document.getElementById('s-email')?.value || DATA.settings.email;
  DATA.settings.phone = document.getElementById('s-phone')?.value || DATA.settings.phone;
  showToast('Settings saved successfully!', 'success');
}

/* ════════════════════════════════════
   THEME TOGGLE
════════════════════════════════════ */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeIco').className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  DATA.settings.darkMode = !isDark;
  showToast(`${isDark ? 'Light' : 'Dark'} mode activated`, 'info');
}

/* ════════════════════════════════════
   EXPORT & ACTIONS
════════════════════════════════════ */
function exportReport() {
  showToast('Generating PDF report...', 'info');
  setTimeout(() => showToast('Report ready! (Demo mode — no actual download)', 'success'), 1500);
}

function downloadReport(name) {
  showToast(`Generating "${name}"...`, 'info');
  setTimeout(() => showToast(`"${name}" ready! (Demo mode)`, 'success'), 1500);
}

function exportTableCSV() {
  const headers = ['ID','Project Name','Module','Status','Priority','Progress'];
  const rows = filteredProjects.map(p => [p.id, `"${p.name}"`, p.module, p.status, p.priority, p.progress+'%']);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'xbzin_projects.csv';
  a.click();
  showToast('Projects exported as CSV!', 'success');
}

function downloadAllData() {
  const data = JSON.stringify({ projects: DATA.projects, patents: DATA.patents, team: DATA.team }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'xbzin_dashboard_data.json';
  a.click();
  showToast('All data exported as JSON!', 'success');
}

function refreshDashboard() {
  showToast('Refreshing dashboard data...', 'info');
  setTimeout(() => {
    initKPICounters();
    showToast('Dashboard refreshed successfully!', 'success');
  }, 800);
}

function handleLogout() {
  openModal('Confirm Logout',
    '<p>Are you sure you want to logout from the XBzin Admin Dashboard?</p>',
    true,
    () => {
      showToast('Logging out...', 'info');
      setTimeout(() => location.reload(), 1000);
    }
  );
}

/* ════════════════════════════════════
   MODAL SYSTEM
════════════════════════════════════ */
function openModal(title, bodyHtml, showConfirm = true, onConfirm = null) {
  document.getElementById('mTitle').textContent = title;
  document.getElementById('mBody').innerHTML = bodyHtml;
  document.getElementById('mFooter').style.display = showConfirm ? 'flex' : 'none';
  document.getElementById('modalBg').classList.add('open');

  document.getElementById('mConfirm').onclick = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };
}

function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
}

document.getElementById('mClose').addEventListener('click', closeModal);
document.getElementById('mCancel').addEventListener('click', closeModal);
document.getElementById('modalBg').addEventListener('click', e => { if (e.target === document.getElementById('modalBg')) closeModal(); });

/* ════════════════════════════════════
   TOAST SYSTEM
════════════════════════════════════ */
function showToast(msg, type = 'info') {
  const icons = { success:'fa-circle-check', error:'fa-circle-xmark', warning:'fa-triangle-exclamation', info:'fa-circle-info' };
  const stack = document.getElementById('toastStack');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-ico ${type}"><i class="fa-solid ${icons[type]}"></i></div>
    <span class="toast-msg">${msg}</span>
    <button class="toast-cls" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
function getLast(n, type) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  return Array.from({length: n}, (_,i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (n-1-i), 1);
    return months[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  });
}

function genData(n, min, max) {
  return Array.from({length: n}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/* ════════════════════════════════════
   BOOT
════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', initLoader);