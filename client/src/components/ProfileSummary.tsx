import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TriggerProps } from "@/types/types1";
import { useEffect, useState } from "react";

interface ProfileSummaryProps {
  profileSummary: string;
  dialogOpen: boolean;
}

const ProfileSummaryTrigger = ({
  // children,
  dialogOpen,
  profileSummary,
}: ProfileSummaryProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(dialogOpen);

  useEffect(() => {
    if (profileSummary) {
      setOpen(true);
    }
  }, [profileSummary]);

  if (matches)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger>{children}</DialogTrigger> */}
        <DialogContent>
          <p>{profileSummary}</p>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger>{children}</DrawerTrigger> */}
      <DrawerContent>
        <p>{profileSummary}</p>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileSummaryTrigger;
