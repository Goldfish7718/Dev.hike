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
import axios from "axios";
import { API_URL } from "@/main";
import { useToast } from "./ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useUser } from "@/context/UserContext";

interface EventRegisterProps extends EventCardProps {
  children: React.ReactNode;
}

const EventRegisterTrigger = ({ children, title, _id }: EventRegisterProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const { user } = useClerkUser();
  const { currProfile } = useUser();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const setFullname = () => {
    setFirstName(user?.firstName as string);
    setLastName(user?.lastName as string);
  };

  const requestRegistration = async () => {
    try {
      await axios.post(
        `${API_URL}/events/register/${_id}/${currProfile?._id}`,
        {
          firstName,
          lastName,
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An Error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
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

              {/* <RadioGroup defaultValue="solo" className="flex mt-2 gap-3">
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem value="solo"/>
                    <Label>Solo</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem value="team"/>
                    <Label>Team</Label>
                  </div>
                </RadioGroup>

                <div>
                  <Label>You can add upto 3 members</Label>
                  <div className="flex gap-3 mt-2">
                    <Input placeholder="Team member name"/>
                    <Button><Plus size={18} /></Button>
                  </div>
                </div> */}
              <Button variant="secondary" onClick={setFullname}>
                Use my Default name
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={requestRegistration}
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

            {/* <RadioGroup defaultValue="solo" className="flex mt-2 gap-3">
            <div className="flex gap-2 items-center">
              <RadioGroupItem value="solo"/>
              <Label>Solo</Label>
            </div>
            <div className="flex gap-2 items-center">
              <RadioGroupItem value="team"/>
              <Label>Team</Label>
            </div>
          </RadioGroup>

          <div>
            <Label>You can add upto 3 members</Label>
            <div className="flex gap-3 mt-2">
              <Input placeholder="Team member name"/>
              <Button><Plus size={18} /></Button>
            </div>
          </div> */}
            <Button variant="secondary" onClick={setFullname}>
              Use my Default name
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={requestRegistration}
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
