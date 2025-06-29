import WordFinder from '@word-finder/word-finder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/word-finder')({
  component: () => <WordFinder />
})
