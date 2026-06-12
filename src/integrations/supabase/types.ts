export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json | null
          id: string
          target_id: string | null
          target_table: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          read: boolean
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          read?: boolean
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          read?: boolean
          subject?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_email: string | null
          donor_name: string | null
          id: string
          message: string | null
          provider: string
          provider_reference: string | null
          status: Database["public"]["Enums"]["donation_status"]
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          message?: string | null
          provider: string
          provider_reference?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          message?: string | null
          provider?: string
          provider_reference?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          location: string | null
          school_id: string | null
          starts_at: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          location?: string | null
          school_id?: string | null
          starts_at: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          location?: string | null
          school_id?: string | null
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_media: {
        Row: {
          caption: string | null
          category: Database["public"]["Enums"]["media_category"]
          created_at: string
          id: string
          media_type: string
          media_url: string
          thumbnail_url: string | null
          title: string | null
        }
        Insert: {
          caption?: string | null
          category?: Database["public"]["Enums"]["media_category"]
          created_at?: string
          id?: string
          media_type?: string
          media_url: string
          thumbnail_url?: string | null
          title?: string | null
        }
        Update: {
          caption?: string | null
          category?: Database["public"]["Enums"]["media_category"]
          created_at?: string
          id?: string
          media_type?: string
          media_url?: string
          thumbnail_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author_id: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partnership_requests: {
        Row: {
          category: Database["public"]["Enums"]["partner_category"]
          contact_person: string
          created_at: string
          email: string
          id: string
          message: string | null
          organization_name: string
          phone: string | null
          status: Database["public"]["Enums"]["application_status"]
          website: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["partner_category"]
          contact_person: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          organization_name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          website?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["partner_category"]
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          organization_name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: string
          name: string
          notes: string | null
          state: string
          students_reached: number
          visited_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          state?: string
          students_reached?: number
          visited_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          state?: string
          students_reached?: number
          visited_at?: string | null
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          amount: number | null
          areas_of_interest: string | null
          category: Database["public"]["Enums"]["sponsor_category"]
          contact_person: string
          created_at: string
          email: string
          id: string
          message: string | null
          organization_name: string
          organization_type: string | null
          phone: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          amount?: number | null
          areas_of_interest?: string | null
          category?: Database["public"]["Enums"]["sponsor_category"]
          contact_person: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          organization_name: string
          organization_type?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          amount?: number | null
          areas_of_interest?: string | null
          category?: Database["public"]["Enums"]["sponsor_category"]
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          organization_name?: string
          organization_type?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          city: string | null
          created_at: string
          cv_url: string | null
          email: string
          expertise: string | null
          full_name: string
          id: string
          linkedin_url: string | null
          motivation: string | null
          occupation: string | null
          organization: string | null
          phone: string | null
          photo_url: string | null
          state: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          cv_url?: string | null
          email: string
          expertise?: string | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          motivation?: string | null
          occupation?: string | null
          organization?: string | null
          phone?: string | null
          photo_url?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          city?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string
          expertise?: string | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          motivation?: string | null
          occupation?: string | null
          organization?: string | null
          phone?: string | null
          photo_url?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "volunteer" | "sponsor" | "public"
      application_status:
        | "pending"
        | "approved"
        | "rejected"
        | "active"
        | "inactive"
      donation_status: "pending" | "succeeded" | "failed" | "refunded"
      media_category:
        | "school_visits"
        | "training_sessions"
        | "workshops"
        | "volunteers"
        | "community_engagement"
      partner_category:
        | "government"
        | "ngo"
        | "charity"
        | "corporate"
        | "educational"
        | "technology"
      sponsor_category: "platinum" | "gold" | "silver" | "bronze" | "community"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "volunteer", "sponsor", "public"],
      application_status: [
        "pending",
        "approved",
        "rejected",
        "active",
        "inactive",
      ],
      donation_status: ["pending", "succeeded", "failed", "refunded"],
      media_category: [
        "school_visits",
        "training_sessions",
        "workshops",
        "volunteers",
        "community_engagement",
      ],
      partner_category: [
        "government",
        "ngo",
        "charity",
        "corporate",
        "educational",
        "technology",
      ],
      sponsor_category: ["platinum", "gold", "silver", "bronze", "community"],
    },
  },
} as const
