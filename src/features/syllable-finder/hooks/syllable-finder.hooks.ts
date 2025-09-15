import { api } from '@eden'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useFindSyllables () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['findSyllables'],
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
      const cacheKey = [
        'findSyllables',
        variables.searchParams.pattern,
        variables.searchParams.listname
      ]

      queryClient.setQueryData(cacheKey, data)

      queryClient.setQueryDefaults(cacheKey, {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false
      })
    },

    onError: (error, variables) => {
      console.error('❌ Erreur syllabes:', { error, variables })
    }
  })
}

export function useWordsBySyllable () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['wordsBySyllable'],
    mutationFn: async (data: { syllable: string; listname: string }) => {
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

    onSuccess: (data, variables) => {
      const cacheKey = [
        'wordsBySyllable',
        variables.syllable,
        variables.listname
      ]

      queryClient.setQueryData(cacheKey, data)

      queryClient.setQueryDefaults(cacheKey, {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false
      })
    },

    onError: (error, variables) => {
      console.error('❌ Erreur mots par syllabe:', { error, variables })
    }
  })
}

export function useOptimizedSyllableSearch () {
  const queryClient = useQueryClient()
  const findSyllables = useFindSyllables()

  const searchWithCache = async (pattern: string, listname: string) => {
    const cacheKey = ['findSyllables', pattern, listname]

    const cachedData = queryClient.getQueryData(cacheKey)
    if (cachedData) {
      return cachedData
    }

    return await findSyllables.mutateAsync({
      searchParams: { pattern, listname }
    })
  }

  return {
    ...findSyllables,
    searchWithCache
  }
}

export function useOptimizedWordsBySyllable () {
  const queryClient = useQueryClient()
  const wordsBySyllable = useWordsBySyllable()

  const searchWithCache = async (syllable: string, listname: string) => {
    const cacheKey = ['wordsBySyllable', syllable, listname]

    const cachedData = queryClient.getQueryData(cacheKey)
    if (cachedData) {
      return cachedData
    }

    return await wordsBySyllable.mutateAsync({
      syllable,
      listname
    })
  }

  return {
    ...wordsBySyllable,
    searchWithCache
  }
}
