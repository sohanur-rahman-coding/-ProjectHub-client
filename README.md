# ProjectHub — Client Application

> Modern, responsive project submission and mentor review platform built with Next.js (App Router), TypeScript, and TailwindCSS.

---

## 🎯 Overview & Task Deliverables

ProjectHub Client provides a clean, dual-role interface for students and mentors:

- **Student Portal:** Submit projects with GitHub/GitLab/Bitbucket links, live previews, and descriptions. View evaluation statuses, read mentor feedback, and update/resubmit rejected projects.
- **Mentor Review Console:** High-performance dashboard featuring server-side pagination, search, status filtering (`ALL`, `PENDING`, `APPROVED`, `REJECTED`), and quick-evaluation modals.
- **Interactive Modals:** Responsive floating dialogs with backdrop blur and an integrated **Fullscreen Toggle (`Maximize2` / `Minimize2`)** to inspect long code descriptions.
- **Zero Tech Jargon:** Clean, human UI focused strictly on user experience, assignment progress, and grading rubrics.

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js:** v18.0.0+ or v20.0.0+
- **npm:** v9.0.0+
- Backend API running on `http://localhost:5000`

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` or `.env.local` file in the client root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 4. Run Development Server
```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 🔑 Demo Credentials

The login page (`/login`) includes 1-click auto-fill buttons for quick testing:

| Role | Email | Password | Primary Routes |
| :--- | :--- | :--- | :--- |
| **Mentor / Evaluator** | `mentor@example.com` | `Password@123` | `/mentor/dashboard` |
| **Student** | `student@example.com` | `Password@123` | `/student/submit`, `/student/my-projects` |
| **Admin** | `admin@example.com` | `Password@123` | Full access across all review & student views |

---

## 📂 Project Structure

```text
ProjectHub-client/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with AuthProvider & Toaster
│   │   ├── page.tsx                # Clean, professional home page
│   │   ├── login/page.tsx          # Dual credential login & Google sign-in
│   │   ├── signup/page.tsx         # Account registration
│   │   ├── student/
│   │   │   ├── submit/page.tsx     # Student project submission portal
│   │   │   └── my-projects/page.tsx# Student submissions tracker
│   │   └── mentor/
│   │       └── dashboard/page.tsx  # Mentor Review Console
│   ├── components/
│   │   ├── ui/                     # Modal (with Fullscreen toggle), Button, Input, Textarea, Card, Badge
│   │   ├── layout/                 # Navbar with role indicators & clean Footer
│   │   ├── mentor/                 # StatsCards, Paginated ReviewTable, ReviewModal
│   │   └── student/                # SubmissionForm, SubmissionsList, UpdateSubmissionModal
│   ├── context/                    # AuthContext (JWT persistence, role routing)
│   ├── lib/                        # Typed API client & helper utilities
│   └── types/                      # Shared TypeScript interfaces
├── .env                            # Client environment configuration
├── package.json
└── tsconfig.json
```

---

## ✨ Features Implemented

### 1. Student Submission & Tracking
- **Repository Validation:** Validates URLs for GitHub, GitLab, and Bitbucket hosts.
- **Duplicate Prevention Alerts:** Immediate UI feedback if a repository URL or project title is already registered.
- **My Submissions Dashboard:** Real-time status badges (`PENDING`, `APPROVED`, `REJECTED`) and mentor critique notes.
- **Resubmission Flow:** Editing a rejected submission automatically updates status back to `PENDING` for re-evaluation.

### 2. Mentor Review Console
- **Real-Time Aggregations:** Live metrics cards for Total, Pending, Approved, and Rejected projects, with approval rate progress.
- **Server-Side Pagination & Filtering:** Filter by status or execute keyword search across student names and project titles.
- **Evaluation Modal:** Approve or reject submissions, select pre-built constructive feedback templates, and inspect code repos with 1-click clipboard helpers.
- **Fullscreen Mode:** Toggle between compact dialog and full-screen workspace with one click.
