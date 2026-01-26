# Resume Intelligence – Frontend

A modern, AI-powered frontend application that analyzes resume compatibility with job descriptions.  
Built to help candidates identify skill gaps, track readiness, and improve applications before applying.

---

## 🚀 Live Demo

🔗 https://resume-intelligence-frontend.vercel.app  


---

## 🧩 Features

- Resume upload (Text & PDF)
- Job description analysis
- AI-powered match scoring
- Missing skill visualization
- Skill gap overview across applications
- Analysis history & detail pages
- Score trend visualization
- Secure authentication (Login / Register)
- Forgot & Reset password flow
- Protected routes
- Modern dark SaaS UI
- Responsive layout

---

## 🛠 Tech Stack

- React
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- Chart.js / Recharts
- React Toastify

---

## 📂 Project Structure

```txt
src/
├── components/
│   ├── Navbar.jsx
│   ├── Loading.jsx
│   └── ScoreTrendChart.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── AnalysisHistory.jsx
│   ├── AnalysisDetail.jsx
│   ├── SkillGapOverview.jsx
│   ├── ForgotPassword.jsx
│   └── ResetPassword.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx

🔐 Authentication Flow

JWT stored in localStorage

Axios interceptor attaches token to requests

Protected routes block unauthenticated access

Password recovery via email-based reset

🧪 Run Locally
git clone https://github.com/your-username/resume-intelligence-frontend
cd resume-intelligence-frontend
npm install
npm run dev

📌 Notes

This frontend is designed with enterprise SaaS UX patterns:

Clear information hierarchy

Minimal distractions

Strong visual feedback

Scalable page structur
