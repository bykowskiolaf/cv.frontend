import { User } from '@/types/User';

import useUser from '../Admin/hooks/useUsers';
import Leaderboard from './components/Leaderboard';
import useStatistics from './hooks/useStatistics';

const Statistics = () => {
  const { leaderboard } = useStatistics();
  const { users } = useUser();

  const data = leaderboard
    ?.map(statResponse => {
      const user = users?.find(user => user.id === statResponse.id) as User;
      return {
        ...user,
        ...statResponse
      };
    })
    .sort((a, b) => b.toxicPercentage - a.toxicPercentage);

  return (
    <div>
      <Leaderboard users={data || []} />
    </div>
  );
};

export default Statistics;
