// features/form-auth/hooks/use-auth.ts - Version recommandée (SIMPLE)
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@eden'

// Eden fournit déjà les types automatiquement
export function useAuth () {
  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await api.auth.verify.get()
      if (response.error) throw response.error
      return response
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true
  })
  const realData = authQuery.data?.data

  const result = {
    user: realData?.user || null,
    isAuthenticated: realData?.isAuthenticated || false,
    isLoading: authQuery.isLoading,
    error: authQuery.error
  }
  return result
}

export function useLogin () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: api.auth.login.post,
    onSuccess: async data => {
      if (!data.data) return
      queryClient.setQueryData(['auth'], {
        data: {
          user: data.data.user,
          isAuthenticated: true
        },
        error: null
      })

      queryClient.invalidateQueries({
        queryKey: ['auth'],
        refetchType: 'none'
      })
    }
  })
}

export function useLogout () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.auth.logout.get,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'] })
      queryClient.setQueryData(['auth'], {
        data: {
          user: null,
          isAuthenticated: false
        },
        error: null
      })
    }
  })
}
