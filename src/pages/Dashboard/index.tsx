import FriendsList from './components/FriendsList';
import MessageArea from './components/MessageArea';

export function Dashboard() {
  return (
    <>
      <div className="grid h-full w-full flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <FriendsList hidden />
        <MessageArea />
      </div>
    </>
  );
}
