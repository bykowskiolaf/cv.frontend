import { URLS } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query';

import { bannedUsersQueryOptions } from './useBannedQueryOptions';

const useBan = () => {
  const queryClient = useQueryClient();

  const {
    data: bannedUsers,
    refetch: refetchBannedUsers,
    isPending: isBannedUsersLoading,
    isError: isBannedUsersError
  } = useSuspenseQuery(bannedUsersQueryOptions);

  const {
    mutateAsync: ban,
    isPending: isBanUserLoading,
    isError: isBanUserError
  } = useMutation({
    mutationFn: async (email: string) =>
      Axios.post(URLS.BAN_USER(email)).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannedUsers'] });
    }
  });

  const {
    mutateAsync: unban,
    isPending: isUnbanUserLoading,
    isError: isUnbanUserError
  } = useMutation({
    mutationFn: async (email: string) =>
      Axios.post(URLS.UNBAN_USER(email)).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannedUsers'] });
    }
  });

  return {
    bannedUsers,
    refetchBannedUsers,
    isBannedUsersLoading,
    isBannedUsersError,

    ban,
    isBanUserLoading,
    isBanUserError,

    unban,
    isUnbanUserLoading,
    isUnbanUserError
  };
};

export default useBan;
