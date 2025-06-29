// Type pour un mot individuel (réutilisable)
export interface WordItem {
  id: number
  word: string
  is_adverb: number
  is_demonym: number
  is_animal: number
  is_verb: number
  creator_id: number
  created_at: Date 
  user_id: number
  image_path: string
  role: string
  username: string
}

export interface WordFindResponse {
  success: true
  listname: string
  pattern: string
  data: WordItem[]
  timestamp: string
  total: number
  hasMore: number
}
