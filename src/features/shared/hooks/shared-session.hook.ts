import { api } from '@eden'
import { useQuery } from '@tanstack/react-query'

export const SESSION_QUERY_KEY = ['session'] as const

export const useSession = () => {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const response = await api.api.session.early.get()
      if (response.error) throw response.error
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: false
  })
}
