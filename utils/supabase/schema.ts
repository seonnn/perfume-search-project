export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brand_list: {
        Row: {
          b_id: number
          b_name: string
        }
        Insert: {
          b_id?: number
          b_name: string
        }
        Update: {
          b_id?: number
          b_name?: string
        }
      }
      fragrance_list: {
        Row: {
          f_id: number
          f_name: string
        }
        Insert: {
          f_id?: number
          f_name: string
        }
        Update: {
          f_id?: number
          f_name?: string
        }
      }
      note_list: {
        Row: {
          f_id: number
          n_id: number
          n_name: string
        }
        Insert: {
          f_id: number
          n_id?: number
          n_name: string
        }
        Update: {
          f_id?: number
          n_id?: number
          n_name?: string
        }
      }
      perfume_list: {
        Row: {
          b_id: number
          imgurl: string
          p_id: number
          p_name: string
        }
        Insert: {
          b_id: number
          imgurl: string
          p_id?: number
          p_name: string
        }
        Update: {
          b_id?: number
          imgurl?: string
          p_id?: number
          p_name?: string
        }
      }
      perfume_note_list: {
        Row: {
          b_id: number | null
          n_id: number
          n_type: string
          p_id: number
          p_n_id: number
        }
        Insert: {
          b_id?: number | null
          n_id: number
          n_type: string
          p_id: number
          p_n_id?: number
        }
        Update: {
          b_id?: number | null
          n_id?: number
          n_type?: string
          p_id?: number
          p_n_id?: number
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
