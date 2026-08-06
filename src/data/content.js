import {
  BadgeCheck,
  PhoneCall,
  MapPin,
  CalendarClock,
  Wallet,
  Building2,
  FileCheck2,
  Star,
  Video,
  Users,
  CreditCard,
  ShieldCheck,
  Clock3,
  FileText,
  Search,
  Waves,
  Headphones,
  Captions,
} from "lucide-react";

// Greetings are shown in their native script/language on purpose — they are
// not translated along with the rest of the UI.
export const GREETINGS = [
  { word: "Hii", lang: "English" },
  // { word: "Bonjour", lang: "French" },
  // { word: "Hola", lang: "Spanish" },
  // { word: "你好", lang: "Mandarin" },
  // { word: "مرحبا", lang: "Arabic" },
  // { word: "नमस्ते", lang: "Hindi" },
  // { word: "Jambo", lang: "Swahili" },
  // { word: "Olá", lang: "Portuguese" },
  // { word: "Привет", lang: "Russian" },
  // { word: "こんにちは", lang: "Japanese" },
  { word: "Hallo", lang: "German" },
];

// Icons only — paired with translated copy by index in each component.
export const STEP_ICONS = [FileText, Search, CreditCard, Waves];
export const CUSTOMER_FEATURE_ICONS = [BadgeCheck, PhoneCall, MapPin, CalendarClock];
export const INTERPRETER_FEATURE_ICONS = [Wallet, Building2, FileCheck2, Star];
export const MODE_ICONS = [Video, Users];
export const SERVICE_ICONS = [Video, Users, FileText, Building2, Headphones, Captions];
export const TRUST_ICONS = [ShieldCheck, Clock3, CreditCard];
