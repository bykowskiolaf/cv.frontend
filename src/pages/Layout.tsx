import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Outlet, useNavigate, useSearch } from '@tanstack/react-router';
import {
  Crown,
  LifeBuoy,
  MessageCircle,
  Shield,
  SquareUser
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// import FriendsList from './Dashboard/components/FriendsList';

export function Layout() {
  // @ts-expect-error - Not sure how to fix this - maybe help here? => https://github.com/TanStack/router/issues/767
  const { loginSuccess } = useSearch({ strict: false });
  const navigate = useNavigate({ from: window.location.pathname });

  useEffect(() => {
    if (loginSuccess) {
      toast.success('Zalogowano pomyślnie!');
    }
  }, [loginSuccess]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate({ to: '/login' });
    toast.info('Wylogowano pomyślnie!');
  };

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-muted"
            aria-label="">
            <MessageCircle
              onClick={() => navigate({ to: '/dashboard' })}
              className="size-5"
            />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            {JSON.parse(localStorage.getItem('user') || '{}').roles?.includes(
              'ADMIN'
            ) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="admin page">
                    <Shield
                      onClick={() => navigate({ to: '/admin' })}
                      className="size-5"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Panel administracyjny
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="statistics page">
                  <Crown
                    onClick={() => navigate({ to: '/statistics' })}
                    className="size-5"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Statystyki użytkowników
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  onClick={() => navigate({ to: '/faq' })}
                  aria-label="Pomoc">
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Pomoc
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Konto">
                <SquareUser className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleLogout}>
                Wyloguj się
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4 py-2">
          <h1 className="text-xl font-semibold mr-auto">ChatVerse</h1>
          {/* <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Users className="size-4" />
                <span className="sr-only">Znajomi</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <FriendsList />
            </DrawerContent>
          </Drawer> */}
          <ModeToggle />
        </header>
        <main className="h-full w-full p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
