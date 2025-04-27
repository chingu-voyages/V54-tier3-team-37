import { useMemo } from 'react';

import { Home, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/cn';
import { User } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

const AvatarDropdown = ({ user, handleLogout }: { user: User; handleLogout: () => void }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const userInitials = useMemo(
    () =>
      user?.displayName
        .split(' ')
        .map((e) => e[0])
        .slice(0, 2)
        .join(''),
    [user?.displayName]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="size-12">
            <AvatarImage
              src={user.imageUrl}
              className="rounded-full border-2 border-prompto-accent"
            />
            <AvatarFallback className="border-2 bg-prompto-accent">{userInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col gap-1 border-2 border-prompto-accent p-2"
        >
          <DropdownMenuLabel className="text-lg font-normal">
            Hello, {user?.displayName}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-0.5 bg-prompto-accent" />
          <DropdownMenuItem className="p-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'flex w-full items-center gap-2 rounded-sm px-5 py-3 text-lg',
                  isActive && 'bg-[#E6E5FF] text-prompto-primary'
                )
              }
            >
              <Home className="text-inherit" />
              Home
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  'flex w-full items-center gap-2 rounded-sm px-5 py-3 text-lg',
                  isActive && 'bg-[#E6E5FF] text-prompto-primary'
                )
              }
            >
              <LayoutDashboard className="text-inherit" />
              Dashboard
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <button
              onClick={() => setSettingsOpen(true)}
              className="flex w-full items-center gap-2 rounded-sm px-5 py-3 text-lg"
            >
              <Settings className="text-inherit" />
              Settings
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-sm px-5 py-3 text-lg"
            >
              <LogOut className="rotate-180 text-inherit" />
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        user={{
          displayName: user.displayName,
          email: user.email,
          createdAt: user.createdAt,
          imageUrl: user.imageUrl,
        }}
      />
    </>
  );
};

export default AvatarDropdown;
