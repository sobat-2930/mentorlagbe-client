export type Tuition = {
  _id: string; title: string; subject: string; classLevel: string;
  mode: "Online" | "Offline"; location: string; monthlyFee: number;
  daysPerWeek: number; tutorName: string; bannerImage?: string;
};

export const mockTuitions: Tuition[] = [
  { _id: "1", title: "HSC Physics Crash Batch", subject: "Physics", classLevel: "HSC", mode: "Online", location: "Zoom", monthlyFee: 2500, daysPerWeek: 3, tutorName: "Arif Rahman" },
  { _id: "2", title: "Higher Math Mastery", subject: "Math", classLevel: "HSC", mode: "Offline", location: "Dhanmondi, Dhaka", monthlyFee: 3000, daysPerWeek: 4, tutorName: "Nusrat Jahan" },
  { _id: "3", title: "IELTS 7+ Intensive", subject: "IELTS", classLevel: "Admission", mode: "Online", location: "Google Meet", monthlyFee: 4000, daysPerWeek: 3, tutorName: "Tanvir Hasan" },
  { _id: "4", title: "Python for Beginners", subject: "Programming", classLevel: "University", mode: "Online", location: "Zoom", monthlyFee: 3500, daysPerWeek: 2, tutorName: "Sadia Islam" },
  { _id: "5", title: "SSC Chemistry 1-on-1", subject: "Chemistry", classLevel: "SSC", mode: "Offline", location: "Agrabad, Chattogram", monthlyFee: 2200, daysPerWeek: 3, tutorName: "Mahbub Alam" },
  { _id: "6", title: "English Spoken Fluency", subject: "English", classLevel: "Any", mode: "Online", location: "Zoom", monthlyFee: 1800, daysPerWeek: 2, tutorName: "Farhana Akter" },
];