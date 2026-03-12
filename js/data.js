// =============================================
//  Teacher-Hub  —  data.js
//  Central mock data & state store
// =============================================

const TH = window.TH = {};

/* ─── Auth State ─── */
TH.state = {
  user: JSON.parse(sessionStorage.getItem('th_user') || 'null'),
};

TH.login = function(user) {
  TH.state.user = user;
  sessionStorage.setItem('th_user', JSON.stringify(user));
  TH.updateNav();
};

TH.logout = function() {
  TH.state.user = null;
  sessionStorage.removeItem('th_user');
  TH.updateNav();
};

/* ─── Navbar updater ─── */
TH.updateNav = function() {
  var actions = document.getElementById('navActions');
  if (!actions) return;
  var u = TH.state.user;

  if (u) {
    /* ── Logged in ── */
    var initials = u.name.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2);
    var dashLink = u.role === 'admin'
      ? '<a href="admin.html" class="btn btn--outline btn--sm">Admin Dashboard</a>'
      : '<a href="dashboard.html" class="btn btn--outline btn--sm">My Dashboard</a>';

    actions.innerHTML =
      '<span class="nav-user">' +
        '<div class="avatar" title="' + u.name + '">' + initials + '</div>' +
        '<span>' + u.name.split(' ')[0] + '</span>' +
      '</span>' +
      dashLink +
      '<button class="btn btn--ghost btn--sm" onclick="TH.logout();location.reload()">Logout</button>';

  } else {
    /* ── Logged out: Login + Sign Up dropdown ── */
    actions.innerHTML =
      '<button class="btn btn--outline btn--sm" onclick="TH.openModal(\'loginModal\')">Login</button>' +
      '<div class="signup-dropdown" id="signupDropdown">' +
        '<button class="btn btn--primary btn--sm" onclick="TH.toggleSignupMenu(event)">Sign Up &#9660;</button>' +
        '<div class="signup-menu" id="signupMenu">' +
          '<button onclick="TH.closeSignupMenu();TH.openModal(\'signupModal\')">' +
            '<span class="sm-icon">&#128105;</span>' +
            '<span><strong>Teacher</strong><small>Create a teacher profile</small></span>' +
          '</button>' +
          '<button onclick="TH.closeSignupMenu();TH.openModal(\'schoolSignupModal\')">' +
            '<span class="sm-icon">&#127979;</span>' +
            '<span><strong>School</strong><small>Register your school</small></span>' +
          '</button>' +
        '</div>' +
      '</div>';
  }
};

/* ─── Sign Up dropdown helpers ─── */
TH.toggleSignupMenu = function(e) {
  e.stopPropagation();
  var menu = document.getElementById('signupMenu');
  if (menu) menu.classList.toggle('open');
};

TH.closeSignupMenu = function() {
  var menu = document.getElementById('signupMenu');
  if (menu) menu.classList.remove('open');
};

document.addEventListener('click', function(e) {
  var dd = document.getElementById('signupDropdown');
  if (dd && !dd.contains(e.target)) TH.closeSignupMenu();
});

/* ─── Toast ─── */
TH.toast = function(msg, duration) {
  duration = duration || 3000;
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, duration);
};

/* ─── Modal helpers ─── */
TH.openModal = function(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
};
TH.closeModal = function(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
};

/* ─── Mobile menu ─── */
TH.toggleMobileMenu = function() {
  var m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
};

/* ─── Teaching Notes Data ─── */
TH.notes = [
  { id: 1, title: 'Grade 11 Mathematics: Functions & Algebra',      subject: 'Mathematics',        grade: 'Grade 11', price: 80,  preview: 'Comprehensive notes covering quadratic functions, exponential graphs, and algebraic manipulations with worked examples aligned to the Liberian curriculum.', premium: true,  downloads: 312 },
  { id: 2, title: 'Biology: Cell Division & Genetics',               subject: 'Biology',            grade: 'Grade 12', price: 100, preview: 'Detailed study guide on mitosis, meiosis, and Mendelian genetics with diagrams and WAEC-style exam questions.', premium: false, downloads: 198 },
  { id: 3, title: 'Integrated Science: Waves & Sound',               subject: 'Integrated Science', grade: 'Grade 10', price: 65,  preview: 'Clear explanations of wave properties, the Doppler effect, and sound intensity with practical examples for Liberian classrooms.', premium: false, downloads: 245 },
  { id: 4, title: 'English Language Arts: Essay Writing',            subject: 'English',            grade: 'Grade 9',  price: 50,  preview: 'Step-by-step guide to argumentative and expository essay writing with annotated model answers for junior high students.', premium: false, downloads: 410 },
  { id: 5, title: 'Economics: Financial Literacy & Budgeting',       subject: 'Economics',          grade: 'Grade 12', price: 115, preview: 'Practical coverage of personal finance, national budgets, and key economic concepts required for the WAEC Economics exam.', premium: true,  downloads: 287 },
  { id: 6, title: 'History: Liberia & West African Independence',    subject: 'History',            grade: 'Grade 11', price: 80,  preview: 'Source-based and essay preparation on Liberian history, the founding of the republic, and West African independence movements.', premium: false, downloads: 176 },
  { id: 7, title: 'Geography: West African Ecosystems & Resources',  subject: 'Geography',          grade: 'Grade 10', price: 65,  preview: 'Map-based notes and case studies covering West African ecosystems, natural resources, and environmental challenges.', premium: false, downloads: 203 },
  { id: 8, title: 'Grade 12 General Mathematics: Data & Statistics', subject: 'Mathematics',        grade: 'Grade 12', price: 80,  preview: 'Practical notes on data handling, statistics, and financial mathematics with real-world Liberian contexts.', premium: true,  downloads: 342 },
];

/* ─── Jobs Data ─── */
TH.jobs = [
  { id: 1, title: 'Head of Mathematics Department',  school: 'Capitol Hill Academy',     subject: 'Mathematics',       location: 'Monrovia',    salary: 'L$7,500 – L$9,200/mo', qualification: 'B.Sc + Teaching Cert.',  deadline: '2026-04-15', premium: true,  description: 'Lead the mathematics department of a well-resourced private school in Monrovia. Minimum 5 years teaching experience and strong WAEC results required.', type: 'Full-time' },
  { id: 2, title: 'English Language Arts Teacher',   school: 'Sinkor United School',     subject: 'English',           location: 'Monrovia',    salary: 'L$5,000 – L$6,300/mo', qualification: 'B.Ed English',           deadline: '2026-04-30', premium: false, description: 'Teach English Language Arts from Grades 7 to 9. Must have strong communication skills and experience preparing students for WAEC.', type: 'Full-time' },
  { id: 3, title: 'Junior Primary Teacher (Gr 1-3)', school: 'Bright Future Primary',    subject: 'Primary Education', location: 'Gbarnga',     salary: 'L$3,700 – L$4,300/mo', qualification: 'Diploma in Education',   deadline: '2026-05-10', premium: false, description: 'Caring and dedicated teacher sought for a growing primary school in Bong County. Experience with early literacy and numeracy programmes required.', type: 'Full-time' },
  { id: 4, title: 'Biology & Chemistry Teacher',     school: 'Harbel Mission School',    subject: 'Biology',           location: 'Harbel',      salary: 'L$5,300 – L$6,600/mo', qualification: 'B.Sc + Teaching Cert.',  deadline: '2026-04-20', premium: true,  description: 'Teach Biology and Chemistry at senior high level. Hands-on lab experience and a track record of strong WAEC results highly valued.', type: 'Full-time' },
  { id: 5, title: 'ICT & Computer Studies Teacher',  school: 'Tech Minds College',       subject: 'ICT',               location: 'Monrovia',    salary: 'L$6,300 – L$7,700/mo', qualification: 'IT Degree + Cert.',      deadline: '2026-05-01', premium: false, description: 'Teach Computer Studies and ICT to senior high students. Proficiency in Microsoft Office, basic coding, and internet literacy required.', type: 'Full-time' },
  { id: 6, title: 'Substitute Economics Teacher',    school: 'Paynesville Community HS', subject: 'Economics',         location: 'Paynesville', salary: 'L$330/day',              qualification: 'B.Sc Economics',         deadline: '2026-04-18', premium: false, description: 'Cover a maternity leave placement for one term. Grade 11-12 Economics. Available to start immediately.', type: 'Contract' },
];

/* ─── Teachers Data ─── */
TH.teachers = [
  { id: 1, name: 'James Kollie',  subjects: ['Mathematics', 'Integrated Science'], location: 'Monrovia',    experience: 8,  qualification: 'B.Sc + Teaching Cert.',  premium: true,  bio: 'Dedicated maths and science educator with a strong WAEC pass record and experience in both public and private Liberian schools.' },
  { id: 2, name: 'Martha Pewee',  subjects: ['English', 'History'],                location: 'Monrovia',    experience: 12, qualification: 'B.Ed (English)',          premium: false, bio: 'Senior English teacher and department head with 12 years of experience and a passion for Liberian literature and creative writing.' },
  { id: 3, name: 'Emmanuel Toe',  subjects: ['Biology', 'Geography'],              location: 'Gbarnga',     experience: 5,  qualification: 'B.Sc Natural Sciences',   premium: true,  bio: 'Energetic educator skilled in inquiry-based learning and running after-school science clubs in Bong County.' },
  { id: 4, name: 'Comfort Flomo', subjects: ['Economics', 'Social Studies'],       location: 'Harbel',      experience: 9,  qualification: 'B.Sc Economics + Cert.',  premium: false, bio: 'Former microfinance officer turned teacher. Brings real-world financial knowledge into engaging economics lessons.' },
  { id: 5, name: 'Alice Sumo',    subjects: ['Primary Education'],                 location: 'Buchanan',    experience: 6,  qualification: 'Diploma in Education',    premium: false, bio: 'Committed early childhood educator focused on foundational literacy and numeracy in Grand Bassa County schools.' },
  { id: 6, name: 'David Tarr',    subjects: ['Physical Education', 'Health'],      location: 'Paynesville', experience: 4,  qualification: 'B.Sc Sports Science',     premium: false, bio: 'Former national youth athlete bringing discipline and energy to PE and health education at the senior high level.' },
];

/* ─── Helpers ─── */
TH.formatCurrency = function(n) { return 'L$' + n; };

TH.avatarColor = function(name) {
  var colors = ['#1a4fa0','#0d2d6e','#4a7fd4','#d4820a','#2e7bb8','#7b4f8a'];
  var hash = 0;
  for (var i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % colors.length;
  return colors[Math.abs(hash)];
};

TH.initials = function(name) {
  return name.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2);
};

TH.daysUntil = function(dateStr) {
  var diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / 86400000));
};
