
import { createFileRoute } from '@tanstack/react-router'
import Chart from '@charts/chart'

export const Route = createFileRoute('/dashboard/chart')({
  component: () => <Chart />
})
