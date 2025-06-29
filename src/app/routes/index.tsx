
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    console.log('Checking auth in index route')
    const authData = context.queryClient.getQueryData(['auth'])

    if (authData?.isAuthenticated) {
      console.log('User authenticated, redirecting to dashboard')
      throw redirect({ to: '/dashboard/home' })
    } else {
      console.log('User not authenticated, redirecting to login')
      throw redirect({ to: '/login' })
    }
  },
  component: () => <div>Redirecting...</div> 
})
