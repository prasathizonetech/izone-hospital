import type { LucideIcon } from "lucide-react";
import {
  Baby,
  HeartPulse,
  Stethoscope,
  Sparkles,
  Wind,
  Scissors,
  Bone,
  Sparkle,
  Dumbbell,
  Ear,
  Activity,
  HeartHandshake,
} from "lucide-react";

export interface Department {
  id: string;
  name: string;
  short: string;
  description: string;
  services: string[];
  icon: LucideIcon;
  accent: string;
  route: string;
}

export const departments: Department[] = [
  {
    id: "obstetrics",
    name: "Obstetrics",
    short: "Guiding you through pregnancy and beyond",
    description:
      "Complete pregnancy care from the first consultation to delivery and recovery, delivered in a warm, Manyata-certified maternity environment.",
    services: [
      "Pre-Pregnancy Care and Counseling",
      "Antenatal Care and Counseling",
      "Antenatal Classes for Pregnant Women",
      "AC Delivery Room",
      "Postnatal Care",
      "Painless Delivery",
    ],
    icon: Baby,
    accent: "from-rose-100 to-primary-soft",
    route: "/departments",
  },
  {
    id: "gynaecology",
    name: "Gynaecology",
    short: "Complete women's health, every stage",
    description:
      "Comprehensive gynaecological consultations and procedures for women at every stage of life, backed by advanced diagnostics.",
    services: [
      "Advanced Laparoscopic Procedure",
      "Hysteroscopy Procedure",
      "Cervical Cancer Screening",
      "Breast Examination",
    ],
    icon: HeartPulse,
    accent: "from-primary-soft to-accent",
    route: "/departments",
  },
  {
    id: "infertility",
    name: "Infertility",
    short: "Where hope becomes family",
    description:
      "A dedicated fertility unit offering evidence-based evaluation, personalised treatment plans and compassionate counselling for couples on the journey to parenthood.",
    services: [
      "IUI (Intrauterine Insemination)",
      "IVF (In Vitro Fertilization)",
      "ICSI (Intracytoplasmic Sperm Injection)",
      "Embryo Freezing",
      "Semen Freezing",
      "Egg Donation Programme",
    ],
    icon: Sparkles,
    accent: "from-accent to-primary-soft",
    route: "/fertility-centre",
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    short: "Everyday care your family can rely on",
    description:
      "General medicine consultations for acute illnesses, chronic disease management and preventive health checks for every member of the family.",
    services: [
      "Fever & Acute Illness",
      "Hypertension Management",
      "Routine Health Checkups",
      "Chronic Disease Care",
    ],
    icon: Stethoscope,
    accent: "from-primary-soft to-accent",
    route: "/departments",
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    short: "Skilled surgical care, close to home",
    description:
      "Surgical consultation and treatment for a range of conditions, with careful pre-operative planning and attentive post-operative recovery care.",
    services: [
      "Surgical Consultation",
      "Minor & Major Surgical Procedures",
      "Day-Care Surgery",
      "Pre & Post-Operative Care",
    ],
    icon: Scissors,
    accent: "from-accent to-primary-soft",
    route: "/departments",
  },
  {
    id: "orthopaedic",
    name: "Orthopaedic",
    short: "Keeping you moving, pain-free",
    description:
      "Diagnosis and treatment of bone, joint and muscle conditions, from fractures to long-term mobility care.",
    services: [
      "Bone & Joint Consultation",
      "Fracture Management",
      "Sports Injury Care",
      "Mobility & Rehabilitation Support",
    ],
    icon: Bone,
    accent: "from-primary-soft to-accent",
    route: "/departments",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    short: "Healthy skin, expert care",
    description:
      "Consultation and treatment for skin, hair and nail conditions, delivered with a patient-first, unhurried approach.",
    services: [
      "Skin Consultation",
      "Acne & Skin Infection Treatment",
      "Allergy & Rash Treatment",
      "Cosmetic Dermatology",
    ],
    icon: Sparkle,
    accent: "from-rose-100 to-primary-soft",
    route: "/departments",
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    short: "Breathe easier, live better",
    description:
      "Specialist respiratory care for asthma, chronic lung conditions and infections, backed by modern diagnostic support.",
    services: [
      "Asthma & Allergy Care",
      "Pneumonia Treatment",
      "Tuberculosis Management",
      "Chronic Respiratory Disease Care",
    ],
    icon: Wind,
    accent: "from-accent to-primary-soft",
    route: "/departments",
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    short: "Restoring strength and movement",
    description:
      "Guided rehabilitation and therapy programmes to help you recover mobility, manage pain and regain strength safely.",
    services: [
      "Post-Surgical Rehabilitation",
      "Musculoskeletal Therapy",
      "Pain Management",
      "Mobility & Exercise Therapy",
    ],
    icon: Dumbbell,
    accent: "from-primary-soft to-accent",
    route: "/departments",
  },
  {
    id: "ent",
    name: "ENT",
    short: "Ear, nose and throat care for all ages",
    description:
      "Diagnosis and treatment of ear, nose and throat conditions, including hearing assessment and hearing aid support.",
    services: ["Audiometry", "Hearing Aid Fitting", "Ear Infections & Care", "Throat & Sinus Care"],
    icon: Ear,
    accent: "from-accent to-primary-soft",
    route: "/departments",
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Neonatology",
    short: "Gentle, expert healthcare for your little ones",
    description:
      "Dedicated neonatal and child care ensuring your newborn and growing children receive compassionate medical attention.",
    services: [
      "Newborn Screening & Care",
      "Vaccination & Immunization",
      "Growth & Developmental Assessment",
      "Pediatric Consultations",
    ],
    icon: Activity,
    accent: "from-rose-100 to-primary-soft",
    route: "/departments",
  },
  {
    id: "diabetology",
    name: "Diabetology & Endocrinology",
    short: "Comprehensive diabetes & metabolic wellness",
    description:
      "Personalized management of Type 1 & 2 diabetes, gestational diabetes, and long-term metabolic health for the family.",
    services: [
      "Gestational Diabetes Care",
      "Continuous Glucose Monitoring",
      "Diet & Lifestyle Counseling",
      "Diabetic Foot & Neuropathy Care",
    ],
    icon: HeartHandshake,
    accent: "from-primary-soft to-accent",
    route: "/departments",
  },
];
