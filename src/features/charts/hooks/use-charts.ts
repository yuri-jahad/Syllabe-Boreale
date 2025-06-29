import { api } from "@eden"
import { useQuery} from "@tanstack/react-query"


export const useCharts = () => {
    return useQuery({
      queryKey: ['charts'], // ✅ queryKey obligatoire
      queryFn: () => api.api.session.early.get(), // ✅ Fonction qui retourne la promesse
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true
    })
  }