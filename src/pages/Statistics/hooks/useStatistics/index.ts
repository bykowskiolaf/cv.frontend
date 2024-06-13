import { useSuspenseQuery } from '@tanstack/react-query';

import { leaderboardQueryOptions } from './leaderBoardQueryOptions';

const useStatistics = () => {
  const {
    data: leaderboard,
    refetch: refetchLeaderboard,
    isPending: isLeaderboardLoading,
    isError: isLeaderboardError
  } = useSuspenseQuery(leaderboardQueryOptions);

  return {
    leaderboard,
    refetchLeaderboard,
    isLeaderboardLoading,
    isLeaderboardError
  };
};

export default useStatistics;
