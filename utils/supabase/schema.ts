export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "note_list_f_id_fkey"
            columns: ["f_id"]
            isOneToOne: false
            referencedRelation: "fragrance_list"
            referencedColumns: ["f_id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "perfume_list_b_id_fkey"
            columns: ["b_id"]
            isOneToOne: false
            referencedRelation: "brand_list"
            referencedColumns: ["b_id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "perfume_note_list_b_id_fkey"
            columns: ["b_id"]
            isOneToOne: false
            referencedRelation: "brand_list"
            referencedColumns: ["b_id"]
          },
          {
            foreignKeyName: "perfume_note_list_n_id_fkey"
            columns: ["n_id"]
            isOneToOne: false
            referencedRelation: "note_list"
            referencedColumns: ["n_id"]
          },
          {
            foreignKeyName: "perfume_note_list_p_id_fkey"
            columns: ["p_id"]
            isOneToOne: false
            referencedRelation: "perfume_list"
            referencedColumns: ["p_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_filter_search_perfume: {
        Args: {
          notes: string
          brands: string
          keyword: string
        }
        Returns: {
          p_id: number
          p_name: string
          imgurl: string
          b_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
