import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDateTime } from '@/utils/formatDate';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    displayName: string;
    email: string;
    createdAt: string;
    imageUrl?: string;
  };
}

const SettingsModal = ({ open, onOpenChange, user }: SettingsModalProps) => {
  const userInitials = user.displayName
    .split(' ')
    .map((name) => name[0])
    .slice(0, 2)
    .join('');

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="flex h-[550px] w-[650px] flex-col gap-8 rounded-[30px] bg-[#FAFDFF] p-8">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar className="size-24">
            <AvatarImage
              src={user.imageUrl}
              alt="User avatar"
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-gray-300 text-5xl text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2
              className="text-2xl font-semibold"
              style={{ color: '#414141' }}
            >
              {user.displayName}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <Separator className="bg-[#d0ecff]" />
        <div className="flex flex-col gap-6">
          <h3
            className="text-lg font-semibold"
            style={{ color: '#414141' }}
          >
            Account Details
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="w-1/3 text-sm text-gray-500">User Name</span>
              <Input
                value={user.email}
                disabled
                className="w-2/3"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="w-1/3 text-sm text-gray-500">Date Joined</span>
              <span className="w-2/3 text-sm text-gray-500">
                {formatDateTime(user.createdAt, 'date')}
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-[#d0ecff]" />
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg font-semibold"
            style={{ color: '#414141' }}
          >
            Saved Prompts
          </h3>
        </div>

        <Separator className="bg-[#d0ecff]" />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
