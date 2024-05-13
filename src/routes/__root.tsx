import LoadingIndicator from '@/components/LoadingIndicator';
import { URLS } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: async ({ location }) => {
    if (location.pathname === '/login' && localStorage.getItem('user')) {
      window.location.href = '/dashboard';
    }

    if (location.pathname !== '/login' && !localStorage.getItem('user')) {
      Axios.get(URLS.ME())
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location.href = '/dashboard';
          } else {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        })
        .catch(err => {
          console.log(err);
          window.location.href = '/login';
        });
    }

    if (location.pathname === '/') {
      window.location.href = '/login';
    }
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
