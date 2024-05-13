import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/User';

type FriendsListProps = {
  hidden?: boolean;
};

const FriendsList = ({ hidden }: FriendsListProps) => {
  const friends: User[] = [];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };
  return (
    <div
      className={`relative ${hidden && 'hidden'} flex-col items-start gap-8 md:flex m-5`}
      x-chunk="dashboard-03-chunk-0">
      <div className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Znajomi</legend>
          {friends.length > 0
            ? friends.map(friend => (
                <>
                  <div
                    className="flex mb-5 items-center gap-4 bg-muted/50 p-2 rounded-lg"
                    key={JSON.stringify(friend)}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={friend.pictureUrl}
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        {getInitials(friend.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium leading-none">
                        {friend.userName}
                      </div>
                      {friend.email}
                    </div>
                  </div>
                </>
              ))
            : 'Brak znajomych :(('}
        </fieldset>
      </div>
    </div>
  );
};

export default FriendsList;
