export type Tuition = {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  schedule: string;
  description: string;
  bannerImage?: string;
  tutorName: string;
  tutorEmail: string;
  tutorBio: string;
  tutorExperience: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
};

export const subjectGradients: Record<string, string> = {
  Physics: "from-[#0f3d33] to-[#1d6b57]",
  Math: "from-[#e4572e] to-[#f08a4b]",
  IELTS: "from-[#2f80c8] to-[#56a6e8]",
  Programming: "from-[#3b2a6b] to-[#6a4fc0]",
  Chemistry: "from-[#2e9e6b] to-[#6ccf9c]",
  English: "from-[#c48a14] to-[#f4b63f]",
  Biology: "from-[#1f7a5a] to-[#8fd694]",
  ICT: "from-[#374151] to-[#6b7280]",
};

const base = {
  approvalStatus: "approved" as const,
  isActive: true,
};

export const mockTuitions: Tuition[] = [
  { ...base, _id: "1", title: "HSC Physics Crash Batch", subject: "Physics", classLevel: "HSC", mode: "Online", location: "Zoom", monthlyFee: 2500, daysPerWeek: 3, schedule: "Sat, Mon, Wed · 8:00 PM", description: "A focused crash batch covering the full HSC Physics syllabus with weekly model tests, doubt-solving sessions and recorded lectures for revision.", tutorName: "Arif Rahman", tutorEmail: "arif@example.com", tutorBio: "BUET graduate who has mentored 300+ HSC students.", tutorExperience: "7 years", createdAt: "2026-11-10" },
  { ...base, _id: "2", title: "Higher Math Mastery", subject: "Math", classLevel: "HSC", mode: "Offline", location: "Dhanmondi, Dhaka", monthlyFee: 3000, daysPerWeek: 4, schedule: "Sun, Tue, Thu, Fri · 5:00 PM", description: "Concept-first Higher Math teaching with chapter-wise practice sheets. Small batch of 8 students for personal attention.", tutorName: "Nusrat Jahan", tutorEmail: "nusrat@example.com", tutorBio: "Math educator focused on building strong fundamentals.", tutorExperience: "6 years", createdAt: "2026-11-09" },
  { ...base, _id: "3", title: "IELTS 7+ Intensive", subject: "IELTS", classLevel: "Admission", mode: "Online", location: "Google Meet", monthlyFee: 4000, daysPerWeek: 3, schedule: "Sat, Mon, Wed · 9:00 PM", description: "Complete IELTS preparation: Listening, Reading, Writing and Speaking with weekly mock tests and personal feedback on every essay.", tutorName: "Tanvir Hasan", tutorEmail: "tanvir@example.com", tutorBio: "IELTS 8.0 scorer and certified language trainer.", tutorExperience: "5 years", createdAt: "2026-11-08" },
  { ...base, _id: "4", title: "Python for Beginners", subject: "Programming", classLevel: "University", mode: "Online", location: "Zoom", monthlyFee: 3500, daysPerWeek: 2, schedule: "Fri, Sat · 10:00 PM", description: "Learn Python from zero with hands-on mini projects. Covers variables, loops, functions, OOP and basic problem solving.", tutorName: "Sadia Islam", tutorEmail: "sadia@example.com", tutorBio: "Software engineer who loves teaching programming basics.", tutorExperience: "4 years", createdAt: "2026-11-07" },
  { ...base, _id: "5", title: "SSC Chemistry 1-on-1", subject: "Chemistry", classLevel: "SSC", mode: "Offline", location: "Agrabad, Chattogram", monthlyFee: 2200, daysPerWeek: 3, schedule: "Sat, Mon, Wed · 4:30 PM", description: "Personal mentorship for SSC Chemistry with step-by-step explanations, weekly tests and board-question practice.", tutorName: "Mahbub Alam", tutorEmail: "mahbub@example.com", tutorBio: "Chemistry teacher with a strong board-exam track record.", tutorExperience: "9 years", createdAt: "2026-11-06" },
  { ...base, _id: "6", title: "English Spoken Fluency", subject: "English", classLevel: "Any", mode: "Online", location: "Zoom", monthlyFee: 1800, daysPerWeek: 2, schedule: "Sun, Thu · 8:30 PM", description: "Practice-based spoken English course focusing on confidence, pronunciation and everyday conversation.", tutorName: "Farhana Akter", tutorEmail: "farhana@example.com", tutorBio: "English language coach for students and job seekers.", tutorExperience: "5 years", createdAt: "2026-11-05" },
  { ...base, _id: "7", title: "SSC Biology Concept Batch", subject: "Biology", classLevel: "SSC", mode: "Offline", location: "Mirpur, Dhaka", monthlyFee: 2000, daysPerWeek: 3, schedule: "Sun, Tue, Thu · 6:00 PM", description: "Diagram-based Biology teaching with chapter tests and easy memory techniques for SSC examinees.", tutorName: "Rumana Sultana", tutorEmail: "rumana@example.com", tutorBio: "Medical student and passionate Biology tutor.", tutorExperience: "3 years", createdAt: "2026-11-04" },
  { ...base, _id: "8", title: "Web Development with React", subject: "Programming", classLevel: "University", mode: "Online", location: "Google Meet", monthlyFee: 5000, daysPerWeek: 3, schedule: "Sat, Mon, Wed · 10:00 PM", description: "Build real projects with HTML, CSS, JavaScript and React. Includes code reviews and portfolio guidance.", tutorName: "Imran Hossain", tutorEmail: "imran@example.com", tutorBio: "Full stack developer working in a product company.", tutorExperience: "6 years", createdAt: "2026-11-03" },
  { ...base, _id: "9", title: "HSC ICT Complete Course", subject: "ICT", classLevel: "HSC", mode: "Online", location: "Zoom", monthlyFee: 1500, daysPerWeek: 2, schedule: "Tue, Fri · 7:30 PM", description: "Chapter-wise HSC ICT coverage including programming basics, database and number systems with practice questions.", tutorName: "Shamim Reza", tutorEmail: "shamim@example.com", tutorBio: "ICT lecturer with a simple, example-driven style.", tutorExperience: "8 years", createdAt: "2026-11-02" },
  { ...base, _id: "10", title: "Medical Admission Physics", subject: "Physics", classLevel: "Admission", mode: "Offline", location: "Khulshi, Chattogram", monthlyFee: 3200, daysPerWeek: 4, schedule: "Sat, Sun, Tue, Thu · 7:00 AM", description: "Admission-focused Physics batch with daily MCQ practice, speed-solving techniques and weekly exams.", tutorName: "Dr. Kamal Uddin", tutorEmail: "kamal@example.com", tutorBio: "Experienced admission coach with excellent results.", tutorExperience: "11 years", createdAt: "2026-11-01" },
  { ...base, _id: "11", title: "General Math for Class 8-9", subject: "Math", classLevel: "SSC", mode: "Online", location: "Zoom", monthlyFee: 1700, daysPerWeek: 3, schedule: "Sat, Mon, Wed · 6:30 PM", description: "Algebra, geometry and arithmetic made simple. Weekly assessments and parent progress updates.", tutorName: "Jannatul Ferdous", tutorEmail: "jannat@example.com", tutorBio: "Patient school-level math teacher.", tutorExperience: "4 years", createdAt: "2026-10-30" },
  { ...base, _id: "12", title: "Organic Chemistry Boot Camp", subject: "Chemistry", classLevel: "HSC", mode: "Online", location: "Google Meet", monthlyFee: 2600, daysPerWeek: 2, schedule: "Fri, Sat · 9:00 PM", description: "Master reactions and mechanisms of HSC Organic Chemistry with mind maps and quick revision notes.", tutorName: "Nabila Karim", tutorEmail: "nabila@example.com", tutorBio: "Chemistry graduate who makes tough topics easy.", tutorExperience: "5 years", createdAt: "2026-10-28" },
  // pending: public list e dekhabe na
  { _id: "13", title: "Pending Demo Batch", subject: "Math", classLevel: "HSC", mode: "Online", location: "Zoom", monthlyFee: 1000, daysPerWeek: 2, schedule: "TBD", description: "Waiting for admin approval.", tutorName: "Demo Tutor", tutorEmail: "demo@example.com", tutorBio: "-", tutorExperience: "1 year", approvalStatus: "pending", isActive: true, createdAt: "2026-10-27" },
];