import UserList from '@/components/UserList';
import { Button } from '@/components/ui/button';
import { User } from '@/types/User';
import { Hammer, Sparkle } from 'lucide-react';

import useBan from './hooks/useBanned';
import useUser from './hooks/useUsers';

const Admin = () => {
  const { bannedUsers, ban, unban } = useBan();
  const { users } = useUser();

  const banUserButton = (user: User) => {
    return (
      <Button
        variant="destructive"
        className="ml-auto"
        onClick={() => {
          ban(user.email);
        }}>
        <Hammer />
      </Button>
    );
  };

  const unBanUserButton = (user: User) => {
    return (
      <Button
        variant="ghost"
        className="ml-auto"
        onClick={() => {
          unban(user.email);
        }}>
        <Sparkle />
      </Button>
    );
  };

  return (
    <>
      <div className="grid h-full w-full flex-1 gap-4 overflow-auto p-4 md:grid-cols-2">
        <UserList
          users={bannedUsers || []}
          name="Zbanowani"
          missingMessage="Brak zbanowanych!"
          userButton={unBanUserButton}
        />
        <UserList
          users={users || []}
          name="Użytkownicy"
          missingMessage="Brak użytkowników!"
          userButton={banUserButton}
        />
      </div>
    </>
  );
};

export default Admin;
