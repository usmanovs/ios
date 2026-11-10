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
      activity_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_label: string | null
          entity_type: string
          id: string
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_label?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_label?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      admin_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
        }
        Relationships: []
      }
      chapters: {
        Row: {
          course_id: string
          created_at: string
          id: string
          order_index: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          order_index?: number
          title?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          image_url: string | null
          lessons_count: number | null
          price: number | null
          start_date: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          image_url?: string | null
          lessons_count?: number | null
          price?: number | null
          start_date?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          image_url?: string | null
          lessons_count?: number | null
          price?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      day_homework: {
        Row: {
          completed: boolean
          content: string
          day_number: number
          pre_class_message: string
          pre_class_message_2: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          completed?: boolean
          content?: string
          day_number: number
          pre_class_message?: string
          pre_class_message_2?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          completed?: boolean
          content?: string
          day_number?: number
          pre_class_message?: string
          pre_class_message_2?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      instructor_notes: {
        Row: {
          covered: boolean
          created_at: string
          day_number: number | null
          id: string
          schedule_order: number
          title: string
          updated_at: string
        }
        Insert: {
          covered?: boolean
          created_at?: string
          day_number?: number | null
          id?: string
          schedule_order?: number
          title?: string
          updated_at?: string
        }
        Update: {
          covered?: boolean
          created_at?: string
          day_number?: number | null
          id?: string
          schedule_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          chapter_id: string | null
          content: string | null
          content_html: string | null
          course_id: string
          covered: boolean
          created_at: string
          day_number: number | null
          id: string
          lesson_type: string
          order_index: number
          schedule_order: number | null
          status: string
          title: string
          video_url: string | null
        }
        Insert: {
          chapter_id?: string | null
          content?: string | null
          content_html?: string | null
          course_id: string
          covered?: boolean
          created_at?: string
          day_number?: number | null
          id?: string
          lesson_type?: string
          order_index?: number
          schedule_order?: number | null
          status?: string
          title: string
          video_url?: string | null
        }
        Update: {
          chapter_id?: string | null
          content?: string | null
          content_html?: string | null
          course_id?: string
          covered?: boolean
          created_at?: string
          day_number?: number | null
          id?: string
          lesson_type?: string
          order_index?: number
          schedule_order?: number | null
          status?: string
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      recording_lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recording_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "recording_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      recording_lesson_videos: {
        Row: {
          created_at: string
          drive_url: string
          id: string
          lesson_id: string
          part_label: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          drive_url?: string
          id?: string
          lesson_id: string
          part_label?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          drive_url?: string
          id?: string
          lesson_id?: string
          part_label?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recording_lesson_videos_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "recording_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      recording_lessons: {
        Row: {
          created_at: string
          description: string
          homework_md: string
          id: string
          lesson_number: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          homework_md?: string
          id?: string
          lesson_number: number
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          homework_md?: string
          id?: string
          lesson_number?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      recording_topic_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          status: string | null
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          status?: string | null
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          status?: string | null
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recording_topic_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "recording_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      recording_topics: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recording_topics_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "recording_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      retro_items: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string
          created_by: string | null
          id: string
          status: string
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string
        }
        Relationships: []
      }
      retro_votes: {
        Row: {
          created_at: string
          id: string
          item_id: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "retro_votes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "retro_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_at: string
          created_at: string
          id: string
          lesson_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      list_admins: {
        Args: never
        Returns: {
          created_at: string
          email: string
          user_id: string
        }[]
      }
      log_activity: {
        Args: {
          _action: string
          _entity_id: string
          _entity_label: string
          _entity_type: string
          _metadata?: Json
        }
        Returns: undefined
      }
      revoke_admin: { Args: { target_user_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
