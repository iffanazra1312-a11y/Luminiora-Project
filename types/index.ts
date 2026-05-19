export type Plan = 'free' | 'premium'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  plan: Plan
  daily_quota: number
  created_at: string
  updated_at: string
}

export type SubtesType = 'TWK' | 'TIU' | 'TKP' | 'SKB_UMUM' | 'SKB_TEKNIS'
export type TesType = 'SKD' | 'SKB_UMUM' | 'SKB_TEKNIS'