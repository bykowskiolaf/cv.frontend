import LoadingIndicator from '@/components/LoadingIndicator';
import { Dashboard } from '@/pages/Dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  pendingComponent: () => <LoadingIndicator screen />,
  component: Dashboard
});
