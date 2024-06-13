// import FriendsList from './components/FriendsList';
import { Button } from '@/components/ui/button';
import { Axios } from '@/utils/Axios';

import MessageArea from './components/MessageArea';

export function Dashboard() {
  const user = localStorage.getItem('user');
  const isBanned = JSON.parse(user || '{}').roles.includes('BANNED');

  const handlePayment = () => {
    Axios.post('/users/pay').then(() => {
      localStorage.removeItem('user');
      window.location.reload();
    });
  };

  return (
    <>
      {/* <div className="grid h-full w-full flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3"> */}
      <div className="grid h-full w-full flex-1 gap-4 overflow-auto p-4">
        {isBanned ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold text-center">
                Twoje konto zostało zablokowane!
              </h1>
              <Button variant="destructive" onClick={handlePayment}>
                Zaplać!
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* <FriendsList /> */}

            <MessageArea />
          </>
        )}
      </div>
    </>
  );
}
