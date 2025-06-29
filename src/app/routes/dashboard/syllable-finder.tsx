import SyllableFinder from '@/features/syllable-finder/syllable-finder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/syllable-finder')({
  component: () => <SyllableFinder />
})
