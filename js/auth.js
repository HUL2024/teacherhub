// =============================================
//  Teacher-Hub  —  auth.js
//  All login and signup functions
// =============================================

/* ─── Auth Tab switcher ─── */
const roleConfig = {
  teacher: { icon:'👩‍🏫', color:'#1a4fa0', light:'rgba(26,79,160,0.08)',  title:'Welcome back',  sub:'Sign in to your teacher account',      btn:'Sign In as Teacher' },
  school:  { icon:'🏫',   color:'#d4820a', light:'rgba(212,130,10,0.08)', title:'Welcome back',  sub:'Sign in to your school admin account',  btn:'Sign In as School'  },
  admin:   { icon:'🔐',   color:'#0d2d6e', light:'rgba(13,45,110,0.09)',  title:'Admin Sign In', sub:'Platform administrator access only',    btn:'Sign In as Admin'   },
};

function switchRole(tab, role) {
  tab.closest('.auth-tabs').querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const ri = document.getElementById('loginRole');
  if (ri) ri.value = role;
  const cfg    = roleConfig[role] || roleConfig.teacher;
  const header = document.getElementById('loginHeader');
  const icon   = document.getElementById('loginRoleIcon');
  const title  = document.getElementById('loginTitle');
  const sub    = document.getElementById('loginSub');
  const btn    = document.getElementById('loginBtn');
  if (icon)   icon.textContent  = cfg.icon;
  if (title)  title.textContent = cfg.title;
  if (sub)    sub.textContent   = cfg.sub;
  if (btn)  { btn.textContent = cfg.btn; btn.style.background = cfg.color; btn.style.borderColor = cfg.color; }
  if (header) { header.style.background = cfg.light; header.style.borderBottom = '3px solid ' + cfg.color; }
}

/* ─── Login ─── */
async function handleLogin(e) {
  e.preventDefault();
  const role   = document.getElementById('loginRole').value;
  const email  = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass   = document.getElementById('loginPass').value;
  const errDiv = document.getElementById('loginError');
  const btn    = document.getElementById('loginBtn');

  if (errDiv) errDiv.classList.add('hidden');
  btn.textContent = 'Signing in…';
  btn.disabled = true;

  // Platform Admin — hardcoded
  if (role === 'admin') {
    if (email === 'georgeet028@gmail.com' && pass === 'Teacherhub2026') {
      TH.login({ name: 'Platform Admin', role: 'admin', email });
      TH.closeModal('loginModal');
      TH.toast('Welcome back, Admin! 👋');
      setTimeout(() => location.href = 'admin.html', 800);
    } else {
      if (errDiv) errDiv.classList.remove('hidden');
      btn.textContent = 'Sign In as Admin';
      btn.disabled = false;
    }
    return;
  }

  // Teacher / School — Supabase login
  const { data, error } = await db.auth.signInWithPassword({ email, password: pass });

  if (error) {
    if (errDiv) errDiv.classList.remove('hidden');
    btn.textContent = role === 'school' ? 'Sign In as School' : 'Sign In as Teacher';
    btn.disabled = false;
    return;
  }

  // Use auth metadata directly — no extra database lookup needed
  const name = data.user.user_metadata?.full_name || email;
  const userRole = data.user.user_metadata?.role || role;

  TH.login({ name, role: userRole, email: data.user.email, id: data.user.id });
  TH.closeModal('loginModal');
  TH.toast('Welcome back, ' + name.split(' ')[0] + '! 👋');
  setTimeout(() => location.href = 'dashboard.html', 800);
}

/* ─── Password Reset ─── */
async function handlePasswordReset(e) {
  e.preventDefault();
  const email  = document.getElementById('resetEmail').value.trim().toLowerCase();
  const btn    = document.getElementById('resetBtn');
  const errDiv = document.getElementById('resetError');
  const body   = document.getElementById('resetBody');

  if (errDiv) errDiv.classList.add('hidden');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password.html'
  });

  if (error) {
    if (errDiv) errDiv.classList.remove('hidden');
    btn.textContent = 'Send Reset Link';
    btn.disabled = false;
    return;
  }

  // Show success message
  body.innerHTML =
    '<div style="text-align:center;padding:20px 0">' +
      '<div style="font-size:48px;margin-bottom:16px">📧</div>' +
      '<h3 style="font-family:var(--font-serif);margin-bottom:8px">Check your email</h3>' +
      '<p style="font-size:14px;color:var(--muted);line-height:1.7">We sent a password reset link to <strong>' + email + '</strong>.<br>Click the link in the email to set a new password.</p>' +
      '<button class="btn btn--outline btn--sm" style="margin-top:20px" onclick="TH.closeModal('resetModal')">Close</button>' +
    '</div>';
}

/* ─── Teacher Signup ─── */
async function handleTeacherSignup(e) {
  e.preventDefault();
  const form      = e.target;
  const firstName = document.getElementById('t-firstName').value.trim();
  const lastName  = document.getElementById('t-lastName').value.trim();
  const email     = document.getElementById('t-email').value.trim();
  const password  = document.getElementById('t-password').value;
  const fullName  = (firstName + ' ' + lastName).trim();

  const btn = form.querySelector('.signup-submit-btn');
  btn.textContent = 'Creating account…';
  btn.disabled = true;

  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role: 'teacher' } }
  });

  if (error) {
    TH.toast('⚠️ ' + error.message);
    btn.textContent = 'Create Free Teacher Account';
    btn.disabled = false;
    return;
  }

  TH.login({ name: fullName, role: 'teacher', email: email, id: data.user.id });
  TH.closeModal('signupModal');
  TH.toast('Welcome to Teacher-Hub, ' + firstName + '! 🎉');
  setTimeout(() => location.href = 'dashboard.html', 800);
}

/* ─── School Signup ─── */
async function handleSchoolSignup(e) {
  e.preventDefault();
  const form       = e.target;
  const schoolName = document.getElementById('sc-schoolName').value.trim();
  const adminName  = document.getElementById('sc-adminName').value.trim();
  const email      = document.getElementById('sc-email').value.trim();
  const password   = document.getElementById('sc-password').value;

  const btn = form.querySelector('.signup-submit-btn');
  btn.textContent = 'Registering…';
  btn.disabled = true;

  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: { data: { full_name: adminName, role: 'school', school_name: schoolName } }
  });

  if (error) {
    TH.toast('⚠️ ' + error.message);
    btn.textContent = 'Register School Free';
    btn.disabled = false;
    return;
  }

  await db.from('school_profiles').insert({ user_id: data.user.id, school_name: schoolName });

  TH.login({ name: adminName, role: 'school', email: email, id: data.user.id, schoolName });
  TH.closeModal('schoolSignupModal');
  TH.toast('School registered! 🏫');
  setTimeout(() => location.href = 'dashboard.html', 800);
}

/* ─── Apply & Purchase ─── */
function handleApply(e) {
  e.preventDefault();
  TH.closeModal('applyModal');
  TH.toast('Application submitted successfully! ✅');
}

function simulatePurchase() {
  TH.closeModal('purchaseModal');
  TH.toast('Purchase complete! Your download has started 📥');
}

function openPurchase(note) {
  document.getElementById('purchaseTitle').textContent = note.title;
  document.getElementById('purchasePrice').textContent = TH.formatCurrency(note.price);
  TH.openModal('purchaseModal');
}

function openApply(job) {
  document.getElementById('applyJobTitle').textContent = job.title + ' — ' + job.school;
  TH.openModal('applyModal');
}

/* ─── Sign Up Dropdown ─── */
function toggleSignupMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('signupMenu');
  if (menu) menu.classList.toggle('open');
}

TH.closeSignupMenu = () => {
  const menu = document.getElementById('signupMenu');
  if (menu) menu.classList.remove('open');
};

document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('signupDropdown');
  if (dropdown && !dropdown.contains(e.target)) TH.closeSignupMenu();
});

document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop',     e => e.preventDefault());
