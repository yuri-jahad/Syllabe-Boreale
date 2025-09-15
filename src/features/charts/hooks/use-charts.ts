import { api } from "@eden"
import { useQuery} from "@tanstack/react-query"


export const useCharts = () => {
    return useQuery({
      queryKey: ['charts'], 
      queryFn: () => api.api.session.early.get(), 
      retry: false,
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true
    })
  }