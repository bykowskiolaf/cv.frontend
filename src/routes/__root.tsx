import LoadingIndicator from '@/components/LoadingIndicator';
import { URLS } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, redirect } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const checkUserSession = async () => {
  try {
    const response = await Axios.get(URLS.ME());
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return;
    }
  } catch (error) {
    // Session is invalid, remove user from localStorage and redirect to login
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ location }) => {
    if (location.pathname === '/') throw redirect({ to: '/login' });

    if (!window.sessionChecked && location.pathname !== '/login') {
      window.sessionChecked = true;
      await checkUserSession();
    }
    return;
  },
  pendingComponent: () => <LoadingIndicator screen />,
  component: () => (
    <>
      <Outlet />
      {import.meta.env.MODE === 'development' && (
        <>
          <TanStackRouterDevtools position="top-right" />
        </>
      )}
    </>
  )
});
