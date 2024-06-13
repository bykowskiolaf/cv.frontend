import { URLS } from '@/config/URLS';
import { User } from '@/types/User';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';


export const bannedUsersQueryOptions = queryOptions({
  queryKey: ['bannedUsers'],
  queryFn: async () =>
    Axios.get<User[]>(URLS.BANNED_USERS())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
