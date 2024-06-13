import LoadingIndicator from '@/components/LoadingIndicator';
import { LoginPage } from '@/pages/LoginPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  pendingComponent: () => <LoadingIndicator screen />,
  component: LoginPage
});
