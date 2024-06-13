import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROLES } from '@/types/User';

import { UserWithStats } from '../types/UserWithStats';

type LeaderboardProps = {
  users: UserWithStats[];
};

const Leaderboard = ({ users }: LeaderboardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  function getColor(perc: number) {
    var r,
      g,
      b = 0;
    if (perc < 50) {
      g = 255;
      r = Math.round(5.1 * perc);
    } else {
      r = 255;
      g = Math.round(510 - 5.1 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }
  

  return (
    <div
      className="relative flex-col items-start gap-8 md:flex m-5"
      x-chunk="dashboard-03-chunk-0">
      <div className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Śmietanka aplikacji
          </legend>
          {users && users.length > 0
            ? users.map((user, index) => (
                <>
                  <div
                    className="flex items-center gap-4 bg-muted/50 p-2 rounded-lg"
                    key={JSON.stringify(user)}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.pictureUrl}
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        {getInitials(user.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div
                        className={`text-sm font-medium leading-none ${user.roles.includes(ROLES.BANNED) && 'text-red-600'}`}>
                        {user.userName} {index === 0 && '👑'}
                      </div>
                      {user.email}
                    </div>
                    <div
                      className="ml-auto"
                      style={{ color: getColor(user.toxicPercentage) }}>
                      {user.toxicPercentage.toFixed(2)} %
                    </div>
                  </div>
                </>
              ))
            : 'Brak użytkowników!'}
        </fieldset>
      </div>
    </div>
  );
};

export default Leaderboard;
