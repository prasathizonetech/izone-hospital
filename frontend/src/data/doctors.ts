import drPunitha from "@/assets/dr-punitha.jpg";
import drBenedict from "@/assets/dr-benedict.jpg";
import drRajesh from "@/assets/dr-rajesh.jpg";
import drMadhan from "@/assets/dr-madhan.jpg";

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  speciality: string;
  departmentId: string;
  experienceYears: number;
  bio: string;
  image: string;
  consultationDays: string;
  consultationTimes: string;
  highlighted?: boolean;
}

export const doctors: Doctor[] = [
  {
    id: "punitha-rajesh",
    name: "Dr. Punitha Rajesh",
    title: "Consultant Gynaecologist & Fertility Specialist",
    qualifications: "MD · DGO · D.G.E.S (Germany)",
    speciality: "Gynaecology, Obstetrics & Fertility",
    departmentId: "fertility",
    experienceYears: 22,
    bio: "Lead consultant of the fertility centre with international training in gynaecological endoscopy. Known for a calm, unhurried consulting style and a strong focus on personalised fertility care.",
    image: drPunitha,
    consultationDays: "Mon – Sat",
    consultationTimes: "10:00 AM – 1:00 PM · 5:00 PM – 8:00 PM",
    highlighted: true,
  },
  {
    id: "sd-benedict",
    name: "Dr. S. D. Benedict",
    title: "Consultant Diabetologist",
    qualifications: "MBBS · Diploma in Diabetology",
    speciality: "Diabetes & Metabolic Care",
    departmentId: "diabetes",
    experienceYears: 18,
    bio: "Focuses on structured, long-term diabetes management combining medication, nutrition and lifestyle counselling for sustainable outcomes.",
    image: drBenedict,
    consultationDays: "Mon, Wed, Fri",
    consultationTimes: "9:00 AM – 12:00 PM",
    highlighted: true,
  },
  {
    id: "rajesh",
    name: "Dr. Rajesh",
    title: "Consultant General Physician",
    qualifications: "MD (General Medicine)",
    speciality: "General & Internal Medicine",
    departmentId: "general-medicine",
    experienceYears: 20,
    bio: "General physician trusted by families across Thillainagar for accurate diagnosis, careful listening and evidence-based treatment.",
    image: drRajesh,
    consultationDays: "Mon – Sat",
    consultationTimes: "11:00 AM – 2:00 PM · 6:00 PM – 8:30 PM",
    highlighted: true,
  },
  {
    id: "madhanmohan",
    name: "Dr. K. Madhanmohan",
    title: "Consultant Physician & Respiratory Specialist",
    qualifications: "MD (Pulmonology)",
    speciality: "Respiratory & Chest Medicine",
    departmentId: "respiratory",
    experienceYears: 25,
    bio: "Respiratory specialist with two decades of experience managing asthma, chronic bronchitis, TB and complex lung infections.",
    image: drMadhan,
    consultationDays: "Tue, Thu, Sat",
    consultationTimes: "10:00 AM – 1:00 PM",
    highlighted: true,
  },
];
