import { URLS } from '@/config/URLS';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const leaderboardQueryOptions = queryOptions({
  queryKey: ['leaderboard'],
  queryFn: async () =>
    Axios.get<StatisticResponse[]>(URLS.LEADERBOARD())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
