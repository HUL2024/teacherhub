// =============================================
//  Teacher-Hub  —  layout.js
//  Injects shared navbar, footer & modals
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
  injectModals();
  TH.updateNav();
  highlightActiveNav();
});

/* ─── Navbar ─── */
function injectNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a class="nav-logo" href="index.html">Teacher<span>Hub</span></a>
        <nav class="nav-links" role="navigation" aria-label="Main">
          <a href="index.html" data-page="index">Home</a>
          <a href="notes.html"     data-page="notes">Notes</a>
          <a href="examvault.html" data-page="examvault">ExamVault LR</a>
          <a href="jobs.html"      data-page="jobs">Jobs</a>
          <a href="teachers.html" data-page="teachers">Teachers</a>
        </nav>
        <div class="nav-actions" id="navActions"></div>
        <button class="hamburger" onclick="TH.toggleMobileMenu()" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile">
        <a href="index.html">Home</a>
        <a href="notes.html">Notes</a>
        <a href="examvault.html">ExamVault LR</a>
        <a href="jobs.html">Jobs</a>
        <a href="teachers.html">Teachers</a>
        <hr class="divider" style="margin:8px 0">
        <a onclick="TH.openModal('loginModal')">Login</a>
        <a onclick="TH.openModal('signupModal')">👩‍🏫 Sign Up as Teacher</a>
        <a onclick="TH.openModal('schoolSignupModal')">🏫 Register a School</a>
      </div>
    </div>
  `;
}

function highlightActiveNav() {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}

/* ─── Footer ─── */
function injectFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="nav-logo" href="index.html" style="color:#fff">Teacher<span style="color:var(--sage-light)">Hub</span></a>
          <p>Connecting Liberian teachers and schools. Find resources, post jobs, and build your teaching career.</p>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <a href="notes.html">Teaching Notes</a>
          <a href="jobs.html">Job Board</a>
          <a href="teachers.html">Teacher Profiles</a>
          <a onclick="TH.openModal('signupModal')" style="cursor:pointer">Sign Up as Teacher</a>
        </div>
        <div class="footer-col">
          <h4>For Schools</h4>
          <a onclick="TH.openModal('schoolSignupModal')" style="cursor:pointer">Register School</a>
          <a href="jobs.html">Post a Vacancy</a>
          <a href="teachers.html">Find Teachers</a>
          <a href="#">Premium Listings</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Use</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Teacher-Hub. All rights reserved.</span>
        <span>Built for Liberian educators</span>
      </div>
    </div>
  `;
}

/* ─── Shared Modals (Login, Signup, School Signup) ─── */
function injectModals() {
  const host = document.getElementById('modalHost');
  if (!host) return;
  host.innerHTML = `
    <!-- Login Modal -->
    <div class="modal-overlay" id="loginModal" onclick="closeIfOverlay(event,'loginModal')">
      <div class="modal-box login-modal-box" id="loginModalBox">
        <button class="modal-close" onclick="TH.closeModal('loginModal')" aria-label="Close">&times;</button>

        <!-- Header: icon + title centred -->
        <div class="login-header" id="loginHeader">
          <div class="login-role-icon" id="loginRoleIcon">👤</div>
          <h2 class="login-title" id="loginTitle">Welcome back</h2>
          <p class="login-sub" id="loginSub">Sign in to your Teacher-Hub account</p>
        </div>

        <!-- Role tabs -->
        <div class="auth-tabs login-tabs" role="tablist" id="loginTabs">
          <button class="auth-tab active" role="tab" onclick="switchRole(this,'teacher')">Teacher</button>
          <button class="auth-tab"        role="tab" onclick="switchRole(this,'school')">School Admin</button>
          <button class="auth-tab"        role="tab" onclick="switchRole(this,'admin')">Platform Admin</button>
        </div>

        <!-- Form -->
        <div class="login-form-area">
          <form onsubmit="handleLogin(event)">
            <div class="form-group">
              <label for="loginEmail">Email address</label>
              <input type="email" id="loginEmail" placeholder="you@example.com" required autocomplete="email"/>
            </div>
            <div class="form-group">
              <label for="loginPass">Password</label>
              <input type="password" id="loginPass" placeholder="••••••••" required autocomplete="current-password"/>
            </div>
            <input type="hidden" id="loginRole" value="teacher"/>
            <div id="loginError" class="alert alert--error hidden" style="margin-bottom:4px">Incorrect email or password.</div>
            <div style="text-align:right;margin-bottom:12px">
              <a style="font-size:13px;color:var(--sage);cursor:pointer" onclick="TH.closeModal('loginModal');TH.openModal('resetModal')">Forgot password?</a>
            </div>
            <button type="submit" class="btn btn--primary btn--block mt-sm" id="loginBtn">Sign In</button>
          </form>
          <p style="font-size:13px;text-align:center;color:var(--muted);margin-top:16px">
            Don't have an account?
            <a style="color:var(--sage);cursor:pointer;font-weight:600"
               onclick="TH.closeModal('loginModal');TH.openModal('signupModal')"> Sign up free</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div class="modal-overlay" id="resetModal" onclick="closeIfOverlay(event,'resetModal')">
      <div style="background:#fff;border-radius:16px;max-width:420px;width:100%;margin:auto;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.25);">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #e5e7eb;">
          <h3 style="font-family:var(--font-serif);font-size:20px;margin:0">Reset Password</h3>
          <button onclick="TH.closeModal('resetModal')" style="border:none;background:none;font-size:22px;cursor:pointer;color:#666;line-height:1;padding:4px">×</button>
        </div>
        <div style="padding:28px 24px" id="resetBody">
          <div style="background:#f0f4ff;border-radius:10px;padding:14px 16px;margin-bottom:20px;display:flex;gap:10px;align-items:flex-start">
            <span style="font-size:20px">🔐</span>
            <p style="font-size:14px;color:#374151;margin:0;line-height:1.6">Enter your email address and we will send you a link to reset your password.</p>
          </div>
          <form onsubmit="handlePasswordReset(event)">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="resetEmail" placeholder="you@example.com" required autocomplete="email"/>
            </div>
            <div id="resetError" class="alert alert--error hidden" style="margin-bottom:12px">Could not find an account with that email.</div>
            <button type="submit" class="btn btn--primary btn--block" id="resetBtn">Send Reset Link</button>
          </form>
          <p style="font-size:13px;text-align:center;color:var(--muted);margin-top:16px">
            Remember your password?
            <a style="color:var(--sage);cursor:pointer;font-weight:600" onclick="TH.closeModal('resetModal');TH.openModal('loginModal')"> Sign in</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Teacher Signup Modal -->
    <div class="modal-overlay" id="signupModal" onclick="closeIfOverlay(event,'signupModal')">
      <div class="signup-modal-box signup-modal-box--teacher">
        <button class="modal-close" onclick="TH.closeModal('signupModal')" aria-label="Close">&times;</button>

        <!-- Coloured header -->
        <div class="signup-header signup-header--teacher">
          <div class="signup-header-icon">👩‍🏫</div>
          <h2 class="signup-header-title">Create Teacher Profile</h2>
          <p class="signup-header-sub">Free to join · Liberia's #1 teacher platform</p>
        </div>

        <!-- Steps indicator -->
        <div class="signup-steps">
          <div class="signup-step active"><span>1</span> Account</div>
          <div class="signup-step-line"></div>
          <div class="signup-step"><span>2</span> Professional</div>
          <div class="signup-step-line"></div>
          <div class="signup-step"><span>3</span> CV</div>
        </div>

        <div class="signup-form-area">
          <form onsubmit="handleTeacherSignup(event)">
            <div class="signup-section">
              <div class="signup-section-label">Your Details</div>
              <div class="form-row">
                <div class="form-group">
                  <label>First Name *</label>
                  <input type="text" id="t-firstName" placeholder="e.g. James" required/>
                </div>
                <div class="form-group">
                  <label>Last Name *</label>
                  <input type="text" id="t-lastName" placeholder="e.g. Kollie" required/>
                </div>
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" id="t-email" placeholder="you@example.com" required/>
              </div>
              <div class="form-group">
                <label>Password *</label>
                <input type="password" id="t-password" placeholder="Min. 8 characters" required/>
              </div>
            </div>
            <button type="submit" class="btn btn--block signup-submit-btn signup-submit-btn--teacher mt-sm">
              Create Free Teacher Account
            </button>
          </form>
          <p style="font-size:12px;color:var(--muted);text-align:center;margin-top:10px">
            Add your qualifications, subjects and CV after signing up.
          </p>
          <p class="signup-footer-link">
            Already have an account?
            <a onclick="TH.closeModal('signupModal');TH.openModal('loginModal')">Sign in</a>
          </p>
        </div>
      </div>
    </div>

    <!-- School Signup Modal -->
    <div class="modal-overlay" id="schoolSignupModal" onclick="closeIfOverlay(event,'schoolSignupModal')">
      <div class="signup-modal-box signup-modal-box--school">
        <button class="modal-close" onclick="TH.closeModal('schoolSignupModal')" aria-label="Close">&times;</button>

        <!-- Coloured header -->
        <div class="signup-header signup-header--school">
          <div class="signup-header-icon">🏫</div>
          <h2 class="signup-header-title">Register Your School</h2>
          <p class="signup-header-sub">Post vacancies · Find qualified teachers</p>
        </div>

        <div class="signup-form-area">
          <form onsubmit="handleSchoolSignup(event)">
            <div class="signup-section">
              <div class="signup-section-label">School Information</div>
              <div class="form-group">
                <label>School Name *</label>
                <input type="text" id="sc-schoolName" placeholder="e.g. Capitol Hill Academy" required/>
              </div>
              <div class="form-group">
                <label>Your Full Name *</label>
                <input type="text" id="sc-adminName" placeholder="Administrator full name" required/>
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" id="sc-email" placeholder="admin@school.edu.lr" required/>
              </div>
              <div class="form-group">
                <label>Password *</label>
                <input type="password" id="sc-password" placeholder="Min. 8 characters" required/>
              </div>
            </div>
            <button type="submit" class="btn btn--block signup-submit-btn signup-submit-btn--school mt-sm">
              Register School Free
            </button>
          </form>
          <p style="font-size:12px;color:var(--muted);text-align:center;margin-top:10px">
            Add your school details, location and logo after signing up.
          </p>
          <p class="signup-footer-link">
            Already registered?
            <a onclick="TH.closeModal('schoolSignupModal');TH.openModal('loginModal')">Sign in</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Purchase Modal -->
    <div class="modal-overlay" id="purchaseModal" onclick="closeIfOverlay(event,'purchaseModal')">
      <div class="modal-box">
        <button class="modal-close" onclick="TH.closeModal('purchaseModal')" aria-label="Close">&times;</button>
        <h2 id="purchaseTitle">Purchase Notes</h2>
        <p class="modal-sub">Instant download after payment</p>
        <div class="price-box" style="background:var(--cream);border-radius:var(--radius-lg);padding:20px 24px;text-align:center;margin-bottom:24px;">
          <div id="purchasePrice" style="font-family:var(--font-mono);font-size:40px;font-weight:700;color:var(--sage)">L$80</div>
          <small class="text-muted" style="font-size:13px">Once-off purchase • Instant PDF download</small>
        </div>
        <div style="border:2px dashed var(--border);border-radius:var(--radius);padding:20px;text-align:center;margin-bottom:20px;color:var(--muted);font-size:13px;">
          💳 <strong>Payment Integration</strong><br>
          <span style="font-size:12px">Mobile Money / PayPal integration placeholder.<br>Connect your payment gateway here.</span>
        </div>
        <button class="btn btn--primary btn--block" onclick="simulatePurchase()">Complete Purchase</button>
      </div>
    </div>
          <div style="background:var(--cream);border-radius:var(--radius);padding:12px 16px;font-size:13px;color:var(--muted);margin-bottom:20px;">
            ✉️ <strong>Email Notifications</strong> — Confirmation emails will be sent once this feature is activated.
          </div>
          <button type="submit" class="btn btn--primary btn--block">Submit Application</button>
        </form>
      </div>
    </div>
  `;
}

/* ─── Close modal when clicking overlay ─── */
function closeIfOverlay(e, id) {
  if (e.target === e.currentTarget) TH.closeModal(id);
}

/* ─── Auth Tab switcher — changes modal colour by role ─── */
const roleConfig = {
  teacher: { icon:'👩‍🏫', color:'#1a4fa0', light:'rgba(26,79,160,0.08)',  title:'Welcome back',   sub:'Sign in to your teacher account',       btn:'Sign In as Teacher' },
  school:  { icon:'🏫',   color:'#d4820a', light:'rgba(212,130,10,0.08)', title:'Welcome back',   sub:'Sign in to your school admin account',   btn:'Sign In as School'  },
  admin:   { icon:'🔐',   color:'#0d2d6e', light:'rgba(13,45,110,0.09)',  title:'Admin Sign In',  sub:'Platform administrator access only',     btn:'Sign In as Admin'   },
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

  if (icon)   icon.textContent               = cfg.icon;
  if (title)  title.textContent              = cfg.title;
  if (sub)    sub.textContent                = cfg.sub;
  if (btn)  { btn.textContent = cfg.btn; btn.style.background = cfg.color; btn.style.borderColor = cfg.color; }
  if (header) { header.style.background = cfg.light; header.style.borderBottom = '3px solid ' + cfg.color; }
}


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

  // ── Platform Admin — hardcoded ──
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

  // ── Teacher / School — Supabase login ──
  const { data, error } = await db.auth.signInWithPassword({
    email,
    password: pass
  });

  if (error) {
    if (errDiv) errDiv.classList.remove('hidden');
    btn.textContent = role === 'school' ? 'Sign In as School' : 'Sign In as Teacher';
    btn.disabled = false;
    return;
  }

  // ── Get their profile ──
  const { data: profile, error: profileError } = await db
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    if (errDiv) errDiv.classList.remove('hidden');
    btn.textContent = 'Sign In as Teacher';
    btn.disabled = false;
    return;
  }

  TH.login({
    name:  profile.full_name  || email,
    role:  profile.role       || role,
    email: profile.email      || email,
    id:    data.user.id
  });

  TH.closeModal('loginModal');
  TH.toast('Welcome back! 👋');
  setTimeout(() => {
    const _u = JSON.parse(sessionStorage.getItem('th_user') || 'null');
    location.href = (_u && _u.role === 'school') ? 'school-dashboard.html' : 'dashboard.html';
  }, 800);
}

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

  console.log('Step 1: Starting signup for', email);

  // Step 1: Create auth account
  const { data, error } = await db.auth.signUp({ email, password });
  console.log('Step 1 result - data:', data);
  console.log('Step 1 result - error:', error);

  if (error) {
    TH.toast('⚠️ ' + error.message);
    btn.textContent = 'Create Free Teacher Account';
    btn.disabled = false;
    return;
  }

  console.log('Step 2: Waiting for trigger...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Step 3: Updating profile for id:', data.user.id);
  const { error: updateError } = await db
    .from('profiles')
    .update({
      role:      'teacher',
      full_name: fullName,
    })
    .eq('id', data.user.id);

  console.log('Step 3 result - updateError:', updateError);

  console.log('Step 4: Creating teacher_profiles row...');
  const { error: teacherError } = await db
    .from('teacher_profiles')
    .insert({ user_id: data.user.id });

  console.log('Step 4 result - teacherError:', teacherError);

  console.log('Step 5: Logging in...');
  TH.login({
    name:  fullName,
    role:  'teacher',
    email: email,
    id:    data.user.id
  });

  TH.closeModal('signupModal');
  TH.toast('Welcome to Teacher-Hub, ' + firstName + '! 🎉');
  setTimeout(() => {
    const _u = JSON.parse(sessionStorage.getItem('th_user') || 'null');
    location.href = (_u && _u.role === 'school') ? 'school-dashboard.html' : 'dashboard.html';
  }, 800);
}

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

  // ── Step 1: Create auth account ──
  const { data, error } = await db.auth.signUp({ email, password });

  if (error) {
    TH.toast('⚠️ ' + error.message);
    btn.textContent = 'Register School Free';
    btn.disabled = false;
    return;
  }

  // ── Step 2: Wait briefly for trigger to create the profile row ──
  await new Promise(resolve => setTimeout(resolve, 1000));

  // ── Step 3: Update the profile row the trigger created ──
  const { error: updateError } = await db
    .from('profiles')
    .update({
      role:      'school',
      full_name: adminName,
    })
    .eq('id', data.user.id);

  if (updateError) {
    TH.toast('⚠️ Profile save failed. Please try again.');
    btn.textContent = 'Register School Free';
    btn.disabled = false;
    return;
  }

  // ── Step 4: Create school_profiles row ──
  const { error: schoolError } = await db
    .from('school_profiles')
    .insert({
      user_id:     data.user.id,
      school_name: schoolName,
    });

  if (schoolError) {
    console.log('school_profiles error:', schoolError.message);
  }

  // ── Step 5: Log them in ──
  TH.login({
    name:       adminName,
    role:       'school',
    email:      email,
    id:         data.user.id,
    schoolName: schoolName
  });

  TH.closeModal('schoolSignupModal');
  TH.toast('School registered! 🏫');
  setTimeout(() => {
    const _u = JSON.parse(sessionStorage.getItem('th_user') || 'null');
    location.href = (_u && _u.role === 'school') ? 'school-dashboard.html' : 'dashboard.html';
  }, 800);
}

function handleApply(e) {
  e.preventDefault();
  TH.closeModal('applyModal');
  TH.toast('Application submitted successfully! ✅');
}

function simulatePurchase() {
  TH.closeModal('purchaseModal');
  TH.toast('Purchase complete! Your download has started 📥');
}

/* ─── Open purchase modal ─── */
function openPurchase(note) {
  document.getElementById('purchaseTitle').textContent = note.title;
  document.getElementById('purchasePrice').textContent = TH.formatCurrency(note.price);
  TH.openModal('purchaseModal');
}

/* ─── Open apply modal ─── */
function openApply(job) {
  document.getElementById('applyJobTitle').textContent = `${job.title} — ${job.school}`;
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

// Close dropdown when clicking anywhere outside
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('signupDropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    TH.closeSignupMenu();
  }
});

/* ─── File upload box drag styles ─── */
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => e.preventDefault());
