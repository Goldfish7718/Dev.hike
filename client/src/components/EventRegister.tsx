import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRoundPlus } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { EventCardProps } from "@/types/types1";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import useEvent from "@/hooks/useEvent";

interface EventRegisterProps extends EventCardProps {
  children: React.ReactNode;
}

const EventRegisterTrigger = ({ children, title, _id }: EventRegisterProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const { user } = useClerkUser();
  const { requestRegistration } = useEvent();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const setFullname = () => {
    setFirstName(user?.firstName as string);
    setLastName(user?.lastName as string);
  };

  if (matches)
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register for {title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <Label>First Name:</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Last Name:</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="secondary" onClick={setFullname}>
                Use my Default name
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => requestRegistration(firstName, lastName, _id)}
                  type="submit"
                  className="px-3 w-full">
                  Register <UserRoundPlus size={16} className="mx-1" />
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Register for {title}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3 px-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>First Name:</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Last Name:</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <Button variant="secondary" onClick={setFullname}>
              Use my Default name
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={() => requestRegistration(firstName, lastName, _id)}
                type="submit"
                className="px-3 w-full">
                Register <UserRoundPlus size={16} className="mx-1" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EventRegisterTrigger;
