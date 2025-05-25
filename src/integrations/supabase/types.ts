export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          phone: string | null
          full_name: string | null
          avatar_url: string | null
          role: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      },
      newsletter_subscriptions: {
        Row: {
          id: number;
          email: string;
          subscribed_at: string;
        };
        Insert: {
          email: string;
          subscribed_at?: string;
        };
        Update: {
          email?: string;
          subscribed_at?: string;
        };
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
