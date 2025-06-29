import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { SESSION_QUERY_KEY } from '@shared/hooks/shared-session.hook'
import { api } from '@eden'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    try {
      // ✅ 1. Vérifier l'authentification d'abord
      const authData = context.queryClient?.getQueryData(['auth'])
      const isAuthenticated = authData?.data?.isAuthenticated
      const user = authData?.data?.user

      if (!isAuthenticated || !user) {
        console.log('❌ Not authenticated, redirecting to login')
        throw redirect({ to: '/login' })
      }

      let sessionData = context.queryClient?.getQueryData(SESSION_QUERY_KEY)

      if (!sessionData) {
        try {
          const sessionResponse = await api.api.session.early.get()

          if (sessionResponse.error) {
          } else {
            sessionData = sessionResponse.data
            context.queryClient?.setQueryData(SESSION_QUERY_KEY, sessionData)
          }
        } catch (sessionError) {}
      } else {
      }

      return {
        user,
        isAuthenticated,
        sessionPreloaded: !!sessionData
      }
    } catch (error) {
      if (error instanceof Response) {
        throw error // Rethrow redirections
      }
      throw redirect({ to: '/login' })
    }
  }
})

function DashboardLayout () {
  return (
    <div className='protected-layout'>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
