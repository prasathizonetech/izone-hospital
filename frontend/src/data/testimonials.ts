export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  department: string;
  date: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya & Karthik",
    city: "Thillainagar",
    rating: 5,
    department: "Fertility Centre",
    date: "March 2025",
    quote:
      "After years of trying, Dr. Punitha and her team helped us welcome our little girl. The counselling, the honesty about our chances, the warmth of the nurses — we felt cared for at every step.",
    initials: "PK",
  },
  {
    id: "t2",
    name: "Lakshmi R.",
    city: "Trichy",
    rating: 5,
    department: "Maternity",
    date: "January 2025",
    quote:
      "Delivered my second child here. The Manyata-certified maternity care is exactly what it promises — clean, safe, and every nurse remembered my name.",
    initials: "LR",
  },
  {
    id: "t3",
    name: "Ravi S.",
    city: "Thillainagar",
    rating: 4,
    department: "Diabetes Care",
    date: "December 2024",
    quote:
      "Dr. Benedict took the time to actually explain my sugar readings and diet. Six months on, my HbA1c is the lowest it has been in years.",
    initials: "RS",
  },
  {
    id: "t4",
    name: "Meena T.",
    city: "Woraiyur",
    rating: 5,
    department: "Gynaecology",
    date: "November 2024",
    quote:
      "Went in worried and left reassured. Straightforward advice, no unnecessary tests, and a real sense of care throughout.",
    initials: "MT",
  },
  {
    id: "t5",
    name: "Suresh & Anu",
    city: "Tiruchirappalli",
    rating: 5,
    department: "Fertility Centre",
    date: "October 2024",
    quote:
      "The fertility team never rushed us. They walked us through every option, every cost. When our IVF cycle worked, they celebrated with us like family.",
    initials: "SA",
  },
  {
    id: "t6",
    name: "Ganesh V.",
    city: "Thillainagar",
    rating: 4,
    department: "Respiratory Care",
    date: "September 2024",
    quote:
      "Dr. Madhanmohan managed my father's chronic asthma with real patience. He is available on the phone whenever we panic.",
    initials: "GV",
  },
];

export const reviewStats = {
  average: 4.6,
  total: 92,
  breakdown: [
    { stars: 5, pct: 68 },
    { stars: 4, pct: 22 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ],
};
