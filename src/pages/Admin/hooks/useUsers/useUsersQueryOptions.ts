import { URLS } from '@/config/URLS';
import { User } from '@/types/User';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';


export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: async () =>
    Axios.get<User[]>(URLS.ALL_USERS())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
