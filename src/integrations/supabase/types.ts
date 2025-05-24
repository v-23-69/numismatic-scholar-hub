export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          email: string | null
          phone: string | null
          theme: string | null
          role: string | null
          is_verified: boolean | null
          verification_level: string | null
          bio: string | null
          location: string | null
          website: string | null
          social_links: Json | null
          preferences: Json | null
          last_login: string | null
          status: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          theme?: string | null
          role?: string | null
          is_verified?: boolean | null
          verification_level?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          preferences?: Json | null
          last_login?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          theme?: string | null
          role?: string | null
          is_verified?: boolean | null
          verification_level?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          preferences?: Json | null
          last_login?: string | null
          status?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration: number
          level: string
          category: string
          tags: string[]
          thumbnail_url: string
          video_url: string
          status: string
          rating: number
          enrolled_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration: number
          level: string
          category: string
          tags: string[]
          thumbnail_url: string
          video_url: string
          status?: string
          rating?: number
          enrolled_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          instructor_id?: string
          price?: number
          duration?: number
          level?: string
          category?: string
          tags?: string[]
          thumbnail_url?: string
          video_url?: string
          status?: string
          rating?: number
          enrolled_count?: number
        }
      }
      enrollments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          course_id: string
          status: string
          progress: number
          completed_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          course_id: string
          status?: string
          progress?: number
          completed_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          course_id?: string
          status?: string
          progress?: number
          completed_at?: string | null
        }
      }
      coins: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          year: number
          country: string
          composition: string
          condition: string
          price: number
          seller_id: string
          images: string[]
          status: string
          verification_status: string
          verification_details: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          year: number
          country: string
          composition: string
          condition: string
          price: number
          seller_id: string
          images: string[]
          status?: string
          verification_status?: string
          verification_details?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          year?: number
          country?: string
          composition?: string
          condition?: string
          price?: number
          seller_id?: string
          images?: string[]
          status?: string
          verification_status?: string
          verification_details?: Json | null
        }
      }
      purchases: {
        Row: {
          id: string
          created_at: string
          buyer_id: string
          coin_id: string
          amount: number
          status: string
          payment_details: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          buyer_id: string
          coin_id: string
          amount: number
          status?: string
          payment_details?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          buyer_id?: string
          coin_id?: string
          amount?: number
          status?: string
          payment_details?: Json | null
        }
      }
      wishlist: {
        Row: {
          id: string
          created_at: string
          user_id: string
          coin_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          coin_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          coin_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
