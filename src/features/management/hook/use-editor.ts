import { api } from '@eden'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WordWithTags } from '../../../../../backend/src/features/vocabulary/words/words.types'
import { toast } from 'sonner'
import { toastErrorCSS } from '@shared/generic/generic.style'

export const useEditorSearch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (syllable: string) =>
      await api.api.vocabulary['find-word-list'].post({ pattern: syllable }),
    mutationKey: ['editor', 'searchWords'],
    onSuccess: (data, syllable) => {
      const cacheKey = ['editor', 'wordSearch', syllable]

      queryClient.setQueryData(['editor', 'currentSearch'], data)
      queryClient.setQueryData(cacheKey, data)
      queryClient.setQueryData(['editor', 'currentSearchTerm'], syllable)

      queryClient.setQueryDefaults(cacheKey, {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false
      })
    },
    onError: () => {
      console.error('Error searching for words')
    }
  })
}

export const useEditorSaveWord = () => {
  return useMutation({
    mutationFn: async ({
      wordId,
      wordWithTags
    }: {
      wordId: string
      wordWithTags: WordWithTags
    }) => {
      console.log('Updating word ID:', wordId)
      console.log('Data:', wordWithTags)

      const response = await api.api.admin.vocabulary
        .update({ id: wordId })
        .put({ wordWithTags })

      if (response.error) throw response.error
      return response.data
    },
    onSuccess: data => {
      if (data?.success) {
        const base = `${data.message}`
        const description = `\nModification of word ${data.wordWithTags.name}\n${
          data.wordWithTags.tags.length
            ? `Tags ${data.wordWithTags.tags.join(', ')}`
            : ''
        }.`

        toast.success(base, {
          description,
          duration: 10000
        })
      }
    },
    onError: error => {
      console.error('Save error:', error)
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

      if (data.success) {
        const base = `${data.data.message}`
        let description = ''

        if (data.data.words && data.data.words.length > 0) {
          const addedWords = data.data.words.map((word: any) => word.name)
          const addedList =
            addedWords.length <= 8
              ? addedWords.join(', ')
              : `${addedWords.slice(0, 8).join(', ')} and ${
                  addedWords.length - 8
                } other${addedWords.length - 8 > 1 ? 's' : ''}...`

          description += `${addedList}`
        }

        if (data.data.inserted > 0 || data.data.skipped > 0) {
          if (data.data.skipped > 0) {
            description += `, ${data.data.skipped} skipped${
              data.data.skipped > 1 ? '' : ''
            } (already exist)`
          }
        }

        toast.success(base, {
          description: description || undefined,
          style: {
            minWidth: '400px',
            maxWidth: '600px'
          },
          duration: 10000
        })
      }
    },

    onError: error => {
      console.log(error, 'error :)')

      let errorMessage = "Error adding words"
      let errorDescription = ''

      if (typeof error === 'object' && error !== null) {
        if ('message' in error) {
          errorMessage = error.message as string
        }
        if ('detailedMessage' in error) {
          errorDescription = error.detailedMessage as string
        }

        if (
          errorMessage.includes('duplicate') ||
          errorMessage.includes('already')
        ) {
          errorMessage = 'Duplicate words detected'
          errorDescription =
            'Some words already exist in the database'
        }

        if (
          errorMessage.includes('User not found')
        ) {
          errorMessage = 'User not found'
          errorDescription =
            'Your session may have expired. Please log in again.'
        }
      } else {
        errorDescription = String(error)
      }

      toast.error(errorMessage, {
        description: errorDescription || "An unexpected error occurred",
        style: toastErrorCSS,
        duration: 8000
      })
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
      toast.success(data?.message)
    },

    onError: error => {
      console.error('Error deleting word:', error)
    }
  })
}