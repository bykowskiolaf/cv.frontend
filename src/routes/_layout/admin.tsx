import LoadingIndicator from '@/components/LoadingIndicator';
import Admin from '@/pages/Admin';
import { bannedUsersQueryOptions } from '@/pages/Admin/hooks/useBanned/useBannedQueryOptions';
import { usersQueryOptions } from '@/pages/Admin/hooks/useUsers/useUsersQueryOptions';
import { ROLES, User } from '@/types/User';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/admin')({
  beforeLoad: async ({ location }) => {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
    if (!user.roles?.includes(ROLES.ADMIN)) {
      throw redirect({
        to: '/dashboard',
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(bannedUsersQueryOptions);
    queryClient.ensureQueryData(usersQueryOptions);
  },
  pendingComponent: () => <LoadingIndicator screen />,
  component: Admin
});
