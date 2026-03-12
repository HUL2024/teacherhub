# Teacher-Hub — MVP Website

A clean, professional multi-page website connecting teachers and schools in Liberia.

---

## Project Structure

```
teacher-hub/
├── index.html          ← Home page (landing, featured content)
├── notes.html          ← Teaching Notes Marketplace
├── jobs.html           ← Job Board
├── teachers.html       ← Teacher Profiles Directory
├── admin.html          ← Platform Admin Dashboard
│
├── css/
│   └── style.css       ← Global stylesheet (all shared styles)
│
└── js/
    ├── data.js         ← Mock data, auth state, shared helpers
    └── layout.js       ← Injects navbar, footer, and all modals
```

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, how-it-works, featured notes/jobs/teachers, CTA |
| Notes | `notes.html` | Full marketplace with sidebar filters |
| Jobs | `jobs.html` | Job board with search, filters, apply modal |
| Teachers | `teachers.html` | Teacher directory with filters |
| Admin | `admin.html` | Dashboard: stats, upload notes, approve jobs, premium toggle |

---

## Shared Files

### `css/style.css`
All global CSS variables, resets, typography, buttons, cards, forms, modals, navbar, footer, and utility classes. Never add page-specific styles here; use a `<style>` block in each HTML page instead.

### `js/data.js`
- `TH.notes` — teaching notes data
- `TH.jobs` — job listings data
- `TH.teachers` — teacher profiles data
- `TH.state.user` — auth state (persisted in sessionStorage)
- `TH.login()` / `TH.logout()` — auth helpers
- `TH.toast()` — global toast notification
- `TH.openModal()` / `TH.closeModal()` — modal helpers
- `TH.formatCurrency()`, `TH.avatarColor()`, `TH.initials()`, `TH.daysUntil()`

### `js/layout.js`
Injects the shared **navbar**, **footer**, and all **modals** (Login, Teacher Signup, School Signup, Purchase, Apply) into every page. Auth form handlers also live here.

---

## Demo Login Credentials (MVP — no real auth)

| Role | How to access |
|------|--------------|
| Teacher | Login → Teacher tab → any email/password |
| School Admin | Login → School Admin tab → any email/password |
| Platform Admin | Login → Platform Admin tab → redirects to admin.html |

---

## Features Implemented

- ✅ Responsive layout (mobile-friendly)
- ✅ Teacher signup & profile creation modal
- ✅ School administrator account modal
- ✅ Notes marketplace with subject/grade/price filters
- ✅ Job board with keyword/subject/location/type filters
- ✅ Teacher profiles directory with filters
- ✅ Premium listing highlights (badge + border)
- ✅ Admin dashboard: stats, notes management, upload form, user table, job approvals, premium toggles
- ✅ Apply for job modal (with CV upload placeholder)
- ✅ Purchase modal (with payment gateway placeholder)
- ✅ Auth state persisted across pages via sessionStorage

---

## How to Run

No build tools needed. Simply open `index.html` in a browser, or serve with any static server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

---

## Next Steps (Post-MVP)

- [ ] Connect a backend (Node/Express or Firebase)
- [ ] Real authentication (JWT or OAuth)
- [ ] Mobile Money / PayPal payment integration
- [ ] Email notifications (SendGrid / Mailgun)
- [ ] CV/file upload to cloud storage (AWS S3 / Cloudinary)
- [ ] Teacher rating and review system
- [ ] School dashboard with applicant tracking
- [ ] SEO and meta tags per page
