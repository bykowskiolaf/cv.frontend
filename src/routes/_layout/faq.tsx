import LoadingIndicator from '@/components/LoadingIndicator'
import Faq from '@/pages/Faq'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/faq')({
  pendingComponent: () => <LoadingIndicator screen />,
  component: Faq
})