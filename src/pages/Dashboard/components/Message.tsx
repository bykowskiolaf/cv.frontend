import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Message as MessageType } from '@/types/Message';
import { ROLES } from '@/types/User';
import { Eye } from 'lucide-react';
import { useState } from 'react';

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {
  const [isVisible, setVisible] = useState(!message.toxicity.isToxic);
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  const isOwnMessage = message.sender.id === '65f9f85b71d1f069c1e0fbaf';
  if (isOwnMessage) {
    return (
      <div key={JSON.stringify(message)} className="w-full text-right my-5">
        {message.message}
      </div>
    );
  }

  return (
    <div className="flex mb-5 items-center gap-4" key={JSON.stringify(message)}>
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage
          referrerPolicy="no-referrer"
          src={message.sender.pictureUrl}
          alt="Avatar"
        />
        <AvatarFallback>{getInitials(message.sender.userName)}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="text-sm font-medium leading-none">
          {message.sender.userName}{' '}
          {message?.sender.roles.includes(ROLES.ADMIN) && (
            <Badge variant="secondary">
              Administrator
            </Badge>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <p className={isVisible ? '' : 'blur-sm'}>
            {message.message}
          </p>
          {message.toxicity.isToxic && (
            <Badge variant="destructive" className='px-0.5'>
              <Eye onClick={() => setVisible(!isVisible)} className="size-3" />
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
