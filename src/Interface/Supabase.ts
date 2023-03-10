export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Admins: {
        Row: {
          created_at: string | null;
          id: number;
          shop: number;
          user: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          shop: number;
          user: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          shop?: number;
          user?: string;
        };
      };
      Dishes: {
        Row: {
          category: string;
          cost: number;
          created_at: string | null;
          description: string;
          id: number;
          name: string;
          shop: number;
        };
        Insert: {
          category: string;
          cost: number;
          created_at?: string | null;
          description: string;
          id?: number;
          name: string;
          shop: number;
        };
        Update: {
          category?: string;
          cost?: number;
          created_at?: string | null;
          description?: string;
          id?: number;
          name?: string;
          shop?: number;
        };
      };
      Images: {
        Row: {
          created_at: string | null;
          id: number;
          index: number;
          name: string;
          shop: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          index: number;
          name: string;
          shop: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          index?: number;
          name?: string;
          shop?: number;
        };
      };
      Ingridients: {
        Row: {
          amount: number;
          created_at: string | null;
          dish: number;
          id: number;
          name: string;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          dish: number;
          id?: number;
          name: string;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          dish?: number;
          id?: number;
          name?: string;
        };
      };
      Shops: {
        Row: {
          category: string;
          created_at: string | null;
          description: string;
          id: number;
          lat: number;
          lng: number;
          name: string;
        };
        Insert: {
          category?: string;
          created_at?: string | null;
          description: string;
          id?: number;
          lat?: number;
          lng?: number;
          name: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string;
          id?: number;
          lat?: number;
          lng?: number;
          name?: string;
        };
      };
      Users: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
        };
      };
      Workers: {
        Row: {
          created_at: string | null;
          id: number;
          image: string;
          name: string;
          shop: number;
          type: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          image: string;
          name: string;
          shop: number;
          type: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          image?: string;
          name?: string;
          shop?: number;
          type?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
