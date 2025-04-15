import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DeleteDialogProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
};

const DeleteDialog = ({
  title = 'Are you sure you want to delete this item?',
  description = 'This action cannot be undone.',
  onConfirm,
  trigger,
}: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className="border-prompto-primary bg-transparent text-[20px] text-prompto-primary inset-ring-2 inset-ring-prompto-primary hover:bg-[#E6E5FF] focus-visible:border-white focus-visible:ring-white/50 active:bg-[#AEA7FF]"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="'bg-destructive dark:focus-visible:ring-destructive/40' text-[20px] text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
