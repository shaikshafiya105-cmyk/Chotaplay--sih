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
      teachers: {
        Row: {
          id: string
          teacher_id: string
          full_name: string
          avatar_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          teacher_id: string
          full_name: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          full_name?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      progress: {
        Row: {
          id: string
          teacher_id: string
          topic_id: string
          note_completed: boolean
          video_completed: boolean
          game_completed: boolean
          activity_completed: boolean
          topic_completed: boolean
          completed_activities: number[]
          updated_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          topic_id: string
          note_completed?: boolean
          video_completed?: boolean
          game_completed?: boolean
          activity_completed?: boolean
          topic_completed?: boolean
          completed_activities?: number[]
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          topic_id?: string
          note_completed?: boolean
          video_completed?: boolean
          game_completed?: boolean
          activity_completed?: boolean
          topic_completed?: boolean
          completed_activities?: number[]
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          teacher_id: string
          student_name: string
          class_section: string
          topic_id: string
          topic_name: string
          class_id: string
          status: 'Understood' | 'Support Needed' | 'Developing' | 'Not Understood'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          student_name: string
          class_section: string
          topic_id: string
          topic_name: string
          class_id: string
          status: 'Understood' | 'Support Needed' | 'Developing' | 'Not Understood'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          student_name?: string
          class_section?: string
          topic_id?: string
          topic_name?: string
          class_id?: string
          status?: 'Understood' | 'Support Needed' | 'Developing' | 'Not Understood'
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
