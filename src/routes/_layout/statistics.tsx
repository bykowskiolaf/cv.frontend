import Statistics from '@/pages/Statistics';
import { leaderboardQueryOptions } from '@/pages/Statistics/hooks/useStatistics/leaderBoardQueryOptions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/statistics')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(leaderboardQueryOptions);
  },
  component: Statistics
});
