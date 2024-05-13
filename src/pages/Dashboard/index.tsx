import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useSearch } from '@tanstack/react-router';
import { LifeBuoy, SquareUser, Triangle, Users } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import FriendsList from './components/FriendsList';
import MessageArea from './components/MessageArea';

export function Dashboard() {
  // @ts-expect-error - Not sure how to fix this - maybe help here? => https://github.com/TanStack/router/issues/767
  const { loginSuccess } = useSearch({ strict: false });

  useEffect(() => {
    if (loginSuccess) {
      toast.success('Zalogowano pomyślnie!');
    }
  }, [loginSuccess]);

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        {/* <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="">
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </nav> */}
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Pomoc">
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Pomoc
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Konto">
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Konto
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold mr-auto">ChatVerse</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Users className="size-4" />
                <span className="sr-only">Znajomi</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              {/* <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader> */}
              <FriendsList />
            </DrawerContent>
          </Drawer>
          <ModeToggle />
          {/* <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm">
            <Share className="size-3.5" />
            Share
          </Button> */}
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <FriendsList hidden />
          <MessageArea />
        </main>
      </div>
    </div>
  );
}
