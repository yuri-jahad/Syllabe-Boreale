// main.tsx - Version recommandée

import { createRoot } from 'react-dom/client'
import '@/assets/css/index.css'
import '@/assets/css/fonts.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '@/app/routes/routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { api } from '@eden'

async function initializeApp () {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false
      }
    }
  })


  try {
    const authData = await api.auth.verify.get()
    if (authData && !authData.error) {
      queryClient.setQueryData(['auth'], authData)
    } else {
      console.log('❌ No valid auth data')
      queryClient.setQueryData(['auth'], {
        data: {
          user: null,
          isAuthenticated: false
        },
        error: null
      })
    }
  } catch (error) {
    console.error('❌ Error checking authentication:', error)
    queryClient.setQueryData(['auth'], {
      data: {
        user: null,
        isAuthenticated: false
      },
      error: error
    })
  }

  const router = createRouter({
    routeTree,
    context: {
      queryClient
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true
  })

  await router.load()

  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />    
    </QueryClientProvider>
  )
}


initializeApp().catch(console.error)
