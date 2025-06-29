import { api } from '@eden'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { WordWithTags } from '../../../../../backend/src/features/vocabulary/words/words.types'
// H

export const useEditorSearch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (syllable: string) =>
      await api.api.vocabulary['find-word-list'].post({ pattern: syllable }),
    mutationKey: ['editor', 'searchWords'],
    onSuccess: (data, syllable) => {
      queryClient.setQueryData(['editor', 'currentSearch'], data)
      queryClient.setQueryData(['editor', 'wordSearch', syllable], data)
      queryClient.setQueryData(['editor', 'currentSearchTerm'], syllable)
    },
    onError: () => {
      console.error('Erreur lors de la recherche de mots')
    }
  })
}

export const useEditorSaveWord = () => {
  return useMutation({
    mutationFn: async ({
      wordId,
      wordWithTags
    }: {
      wordId: string // ✅ string pour l'URL
      wordWithTags: WordWithTags
    }) => {
      console.log('🎯 Updating word ID:', wordId)
      console.log('📝 Data:', wordWithTags)

      const response = await api.api.admin.vocabulary
        .update({ id: wordId })
        .put({ wordWithTags })

      if (response.error) throw response.error
      return response.data // ✅ Retourne data, pas response
    },
    onSuccess: data => {
      console.log('✅ Mot sauvegardé avec succès:', data)
      // Optionnel : invalider les queries liées
      // queryClient.invalidateQueries(['editor', 'words'])
    },
    onError: error => {
      console.error('❌ Erreur lors de la sauvegarde:', error)
    }
  })
}

export interface wordsDetails {
  name: string
  tags: string[]
}

export const useEditorAddWords = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      creator_id: number
      words_details: wordsDetails[]
    }) => {
      const response = await api.api.admin.vocabulary.add.post({
        words_details: data.words_details,
        creator_id: data.creator_id
      })
      if (response.error) throw response.error
      return response.data
    },

    onSuccess: data => {
      console.log('✅ Mots ajoutés avec succès:', data)
      console.log(
        `${data.inserted} mot(s) ajouté(s), ${data.skipped} ignoré(s)`
      )
      queryClient.invalidateQueries({ queryKey: ['editor'] })
      const currentSearchTerm = queryClient.getQueryData([
        'editor',
        'currentSearchTerm'
      ])
      if (currentSearchTerm) {
        queryClient.invalidateQueries({
          queryKey: ['editor', 'currentSearch']
        })
      }
    },

    onError: error => {
      console.error("❌ Erreur lors de l'ajout des mots:", error)
    }
  })
}

export const useEditorDeleteWord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (wordId: number) => {
      const response = await api.api.admin.vocabulary
        .remove({ id: wordId.toString() })
        .delete()
      console.log(response, 'toto')
      if (response.error) {
        throw response.error
      }
      return response.data
    },

    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['editor'] })
      const currentSearchTerm = queryClient.getQueryData([
        'editor',
        'currentSearchTerm'
      ])
      if (currentSearchTerm) {
        queryClient.invalidateQueries({
          queryKey: ['editor', 'currentSearch']
        })
      }
    },

    onError: error => {
      console.error('❌ Erreur lors de la suppression du mot:', error)
    }
  })
}
