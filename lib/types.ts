export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "no_show";

export type Store = {
  id: string;
  name: string;
  opening_time: string; // "HH:MM:SS" or "HH:MM"
  closing_time: string;
  last_order_time: string | null;
  total_seats: number;
  max_reservation_seats: number;
  closed_days: string[];
  address: string | null;
  parking_info: string | null;
  main_menu: string | null;
  group_reservation_threshold: number;
  notice: string | null;
  created_at: string;
  updated_at: string;
};

export type Reservation = {
  id: string;
  store_id: string;
  customer_name: string;
  phone: string;
  reservation_date: string; // "YYYY-MM-DD"
  reservation_time: string; // "HH:MM:SS" or "HH:MM"
  party_size: number;
  status: ReservationStatus;
  memo: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: string;
  store_id: string;
  question: string;
  answer: string;
  category: string | null;
  created_at: string;
  updated_at: string;
};

export type ReservationInput = {
  customer_name: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  memo?: string;
};
