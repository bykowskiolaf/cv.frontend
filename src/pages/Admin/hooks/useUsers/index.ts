import { useSuspenseQuery } from '@tanstack/react-query';

import { usersQueryOptions } from './useUsersQueryOptions';

const useUser = () => {
  const {
    data: users,
    refetch: refetchUsers,
    isPending: isUsersLoading,
    isError: isUsersError
  } = useSuspenseQuery(usersQueryOptions);

  return {
    users,
    refetchUsers,
    isUsersLoading,
    isUsersError
  };
};

export default useUser;
