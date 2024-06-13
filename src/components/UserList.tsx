import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROLES, User } from '@/types/User';

type UserListProps = {
  users: User[];
  name: string;
  missingMessage: string;
  userButton?: (user: User) => JSX.Element;
};

const UserList = ({
  users,
  name,
  missingMessage,
  userButton
}: UserListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  users.sort((a, b) => a.userName.localeCompare(b.userName));
  return (
    <div
      className="relative flex-col items-start gap-8 md:flex m-5"
      x-chunk="dashboard-03-chunk-0">
      <div className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            {name ?? 'Użytkownicy'}
          </legend>
          {users && users.length > 0
            ? users.map(user => (
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
                        {user.userName}
                      </div>
                      {user.email}
                    </div>
                    {userButton && userButton(user)}
                  </div>
                </>
              ))
            : missingMessage ?? 'Brak użytkowników!'}
        </fieldset>
      </div>
    </div>
  );
};

export default UserList;
