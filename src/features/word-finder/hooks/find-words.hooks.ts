// features/form-auth/hooks/use-auth.ts - Version recommandée (SIMPLE)

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@eden'
import {
  DefByNameSuccess
} from '@backend/features/vocabulary/definitions/definitions.types'

export function useFindWords () {
  return useMutation({
    mutationKey: ['findWords'],
    mutationFn: async (data: any) => {
      const response = await api.api.vocabulary['find-words'].post(data)
      if (response.error) {
        throw new Error(response.error.message || 'Erreur lors de la recherche')
      }
      return response.data
    },
    onSuccess: data => {},
    onError: error => {}
  })
}

export function useDefinitionByName (wordName: string) {
  return useQuery<DefByNameSuccess>({
    queryKey: ['definition', 'by-name', wordName],
    queryFn: async () => {
      if (!wordName) throw new Error('Word name required')

      const response = await api.api.vocabulary.def['word-name']({
        word: wordName
      }).get()

      // Votre API retourne { data: {...} }, on prend juste data
      return (response as any).data as DefByNameSuccess
    },
    enabled: !!wordName
  })
}
