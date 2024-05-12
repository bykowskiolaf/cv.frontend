import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Client } from '@stomp/stompjs';
import { CornerDownLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  message: string;
};

enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

type User = {
  email: string;
  id: string;
  pictureUrl: string;
  roles: ROLES[];
  userName: string;
};

type Message = {
  sender: User;
  message: string;
};

const MessageArea = () => {
  // State to hold messages queued for sending
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();
  const stompClientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    if (stompClientRef.current?.connected) {
      stompClientRef.current?.publish({
        destination: '/app/hello',
        body: JSON.stringify({ message: data.message })
      });
      setValue('message', '');
    } else {
      // Queue the message if not connected
      setMessageQueue(prevQueue => [...prevQueue, data.message]);
    }
  };

  useEffect(() => {
    if (!stompClientRef.current) {
      stompClientRef.current = new Client({
        brokerURL: 'wss://cv.bykowski.dev/api/chat',
        reconnectDelay: 5000,
        onConnect: frame => {
          console.log('Connected:', frame);
          // Attempt to send messages that were queued during downtime
          messageQueue.forEach(message => {
            stompClientRef.current?.publish({
              destination: '/app/hello',
              body: JSON.stringify({ message })
            });
          });
          setMessageQueue([]);

          stompClientRef.current?.subscribe('/topic/greetings', greeting => {
            const newMessage = JSON.parse(greeting.body);
            console.log(newMessage);
            console.log(newMessage.sender.pictureUrl);
            setMessages(prevMessages => [...prevMessages, newMessage]);
          });
        },
        onDisconnect: () => {
          console.error('Disconnected');
        },
        onWebSocketError: error => {
          console.error('WebSocket Error:', error);
        },
        onStompError: frame => {
          console.error('STOMP Error:', frame.headers['message'], frame.body);
        }
      });

      stompClientRef.current?.activate();
    }

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Activate client on component mount
  useEffect(() => {
    stompClientRef.current?.activate();
    return () => {
      stompClientRef.current?.deactivate();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <div className="flex-1 max-h-[70vh] overflow-auto">
        {messages.map(message => {
          const isOwnMessage = message.sender.id === '65f9f85b71d1f069c1e0fbaf';
          if (!isOwnMessage)
            return (
              <div
                className="flex mb-5 items-center gap-4"
                key={JSON.stringify(message)}>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={message.sender.pictureUrl}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {getInitials(message.sender.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {message.sender.userName}{' '}
                    {message?.sender.roles.includes(ROLES.ADMIN) && (
                      <Badge variant="secondary" className="mr-2">
                        Administrator
                      </Badge>
                    )}
                  </p>
                  {/* {message?.sender.roles.includes(ROLES.ADMIN) && (
                    <Badge variant="secondary" className="mr-2">
                      Administrator
                    </Badge>
                  )} */}
                  {message.message}
                </div>
                {/* <div className="ml-auto font-medium">{message.message}</div> */}
              </div>
            );
          else
            return (
              <div
                key={JSON.stringify(message)}
                className="w-full text-right my-5">
                {message.message}
              </div>
            );
        })}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={messagesEndRef}></div>
      </div>
      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring mt-5"
        x-chunk="dashboard-03-chunk-1"
        onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={watch('message')}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
          {...register('message', { required: true })}
        />
        <div className="flex items-center p-3 pt-0">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>{' '}
    </div>
  );
};

export default MessageArea;
