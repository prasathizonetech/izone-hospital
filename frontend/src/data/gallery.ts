import exterior from "@/assets/hospital-exterior.webp";
import reception from "@/assets/reception.jpg";
import delivery from "@/assets/delivery-room.jpg";
import lab from "@/assets/lab.jpg";
import fertility from "@/assets/fertility-lab.jpg";
import family from "@/assets/family-care.webp";
import hero from "@/assets/hero-maternity.jpg";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Facility" | "Team" | "Moments";
  src: string;
}

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Hospital exterior on Gandhi Road", category: "Facility", src: exterior },
  { id: "g2", title: "Welcoming reception area", category: "Facility", src: reception },
  { id: "g3", title: "Modern labour & delivery suite", category: "Facility", src: delivery },
  { id: "g4", title: "In-house diagnostic laboratory", category: "Facility", src: lab },
  { id: "g5", title: "Fertility & embryology lab", category: "Facility", src: fertility },
  { id: "g6", title: "New parents in our maternity ward", category: "Moments", src: family },
  { id: "g7", title: "Comforting maternity care", category: "Moments", src: hero },
];
