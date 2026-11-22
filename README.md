<div align="center">

# 🎓 MentorLagbe

**Smart Tuition & Mentorship Platform**

Find verified tutors by subject, class level, mode and budget.

</div>

---

## 📌 Project Name
**MentorLagbe** (Client)

## 🎯 Purpose
MentorLagbe connects **Tutors** who offer tuition batches or 1-on-1 mentorship with **Students** looking for personalized guidance, while **Admins** moderate listings, users and subscription payments.

Students and parents can find verified tutors in one place, and tutors get a structured platform to showcase their batches and manage enrollments.

## 🔗 Live URL
**https://mentorlagbe-client-lw3ikbgn1-sobat1.vercel.app**

Server API: https://mentorlagbe-server-ruby.vercel.app

## 🔑 Admin Credentials
| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@mentorlagbe.com` | `Admin@123` |
| Tutor | `tutor@mentorlagbe.com` | `Tutor@123` |
| Student | `student@mentorlagbe.com` | `Student@123` |

## ✨ Key Features
- **Role-based authentication** for Student, Tutor and Admin (BetterAuth + JWT)
- **Browse Tuitions** with server-side search, filters (subject, class level, mode) and pagination
- **Apply for tuitions** (students only) with duplicate application prevention
- **Student dashboard:** stats, my applications, cancel pending applications
- **Tutor dashboard:** post tuition with ImgBB banner upload, full CRUD, active/closed toggle, accept or reject applicants
- **Free plan limit:** free tutors can post 2 tuitions, Pro tutors post unlimited
- **Admin dashboard:** platform stats, user role management, tuition approval, transaction history
- **Stripe Checkout** for Pro plans (Tutor $15, Student $10)
- **Update profile** with ImgBB photo upload
- Responsive design, collapsible dashboard sidebar, loading skeletons, custom 404 and error pages
- Toast notifications for every action

## 📦 NPM Packages Used
| Package | Use |
|---|---|
| `next`, `react`, `react-dom` | Framework (Next.js App Router) |
| `typescript` | Type safety |
| `tailwindcss`, `@tailwindcss/postcss` | Styling |
| `shadcn` | UI components |
| `class-variance-authority`, `clsx`, `tailwind-merge` | Component styling utilities |
| `better-auth` | Authentication client |
| `framer-motion` | Animations |
| `lucide-react`, `react-icons` | Icons |
| `sonner` | Toast notifications |

## 🛠️ Repositories
- Client: https://github.com/sobat-2930/mentorlagbe-client

- Server: https://github.com/sobat-2930/mentorlagbe-server
