import { Faq, Reservation, Store } from "../types";

// Supabase CLI로 생성하는 대신, MVP 범위에 맞춰 손으로 작성한 최소 Database 타입.
export interface Database {
  public: {
    Tables: {
      stores: {
        Row: Store;
        Insert: Partial<Store>;
        Update: Partial<Store>;
        Relationships: [];
      };
      reservations: {
        Row: Reservation;
        Insert: Partial<Reservation>;
        Update: Partial<Reservation>;
        Relationships: [];
      };
      faqs: {
        Row: Faq;
        Insert: Partial<Faq>;
        Update: Partial<Faq>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
