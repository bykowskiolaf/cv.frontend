import LoadingIndicator from '@/components/LoadingIndicator'
import { Layout } from '@/pages/Layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  pendingComponent: () => <LoadingIndicator screen />,
  component: Layout
})