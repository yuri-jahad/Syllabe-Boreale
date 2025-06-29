import Home from '@/features/home/home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/home')({
  component:() => <Home/>
})




