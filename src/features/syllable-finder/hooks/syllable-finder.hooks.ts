import { api } from '@eden'
import { useMutation } from '@tanstack/react-query'

export function useFindSyllables () {
  return useMutation({
    // Pas de mutationKey fixe, ou utilisez une clé dynamique
    // mutationKey: ['syllablesWords'], // <- Supprimez cette ligne

    mutationFn: async (data: {
      searchParams: { pattern: string; listname: string }
    }) => {
      const response = await api.api.vocabulary['find-syllables'].post(data)

      if (response.error) {
        throw new Error(response.error.message || 'Erreur lors de la recherche')
      }
      return response.data
    },

    onSuccess: (data, variables) => {
      console.log('Mutation Success:', { data, variables }) // Debug
    },

    onError: (error, variables) => {
      console.error('Mutation Error:', { error, variables }) // Debug
    }
  })
}

export function useWordsBySyllable () {
  return useMutation({
    mutationKey: ['wordsBySyllable'],
    mutationFn: async (data: { syllable: string; listname: string }) => {
      // Utilise l'endpoint find-words avec la syllabe comme pattern
      const response = await api.api.vocabulary['find-words'].post({
        searchParams: {
          pattern: data.syllable,
          listname: data.listname
        }
      })
      if (response.error) {
        throw new Error(
          response.error.message || 'Erreur lors de la recherche de mots'
        )
      }
      return response.data
    },
    onSuccess: data => {},
    onError: error => {}
  })
}
