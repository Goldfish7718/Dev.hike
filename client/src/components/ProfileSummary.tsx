import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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
        <DialogContent>
          <p>{profileSummary}</p>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-4">
        <p>{profileSummary}</p>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileSummaryTrigger;
