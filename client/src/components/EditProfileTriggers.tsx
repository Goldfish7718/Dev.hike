import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Check, Plus, SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import { EditBioTriggerProps } from "@/types/types1";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/main";
import { useUser } from "@/context/UserContext";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";

export const EditBioTrigger = ({ children, bio }: EditBioTriggerProps) => {
  const matches = useMediaQuery("(min-width: 768px)");

  const { currProfile, setCurrProfile } = useUser();

  const requestBioChange = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/profile/updateUser/${currProfile?._id}`,
        {
          newUser: {
            ...currProfile,
            bio: currBio,
          },
        }
      );

      setCurrProfile(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  const handleOnOpenChange = () => {
    setCurrBio(bio);
    setOpen(!open);
  };

  const [currBio, setCurrBio] = useState(bio);
  const [open, setOpen] = useState(false);

  if (matches)
    return (
      <>
        <Dialog
          onOpenChange={handleOnOpenChange}
          open={open}
          defaultOpen={false}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                Edit Bio
                <SquarePen size={24} className="mx-2" />
              </DialogTitle>
            </DialogHeader>
            <div>
              <Textarea
                value={currBio}
                onChange={(e) => setCurrBio(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={requestBioChange} className="w-full">
                Confirm <Check />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );

  return (
    <>
      <Drawer onOpenChange={handleOnOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center">
              Edit Bio
              <SquarePen size={24} className="mx-2" />
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-2 flex flex-col gap-2">
            <div>
              <Textarea
                value={currBio}
                onChange={(e) => setCurrBio(e.target.value)}
              />
            </div>
            <div>
              <DrawerClose>
                <Button onClick={requestBioChange} className="w-full">
                  Confirm <Check />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const EditDomainsTrigger = ({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: string;
}) => {
  const matches = useMediaQuery("(min-width: 768px)");

  const { currProfile, setCurrProfile } = useUser();
  const { toast } = useToast();

  const [domain, setDomain] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const addDomain = () => {
    if (domain === " " || !domain)
      toast({
        title: "Please Enter a domain!",
        duration: 3000,
        variant: "destructive",
      });
    else if (domains.length === 8)
      toast({
        title: "You can app only upto 8 domains!",
        duration: 3000,
        variant: "destructive",
      });
    else setDomains((prev) => [...prev, domain]);

    setDomain("");
  };

  const deleteDomain = (indexToBeRemoved: number) => {
    const newDomains = domains.filter((_, index) => index !== indexToBeRemoved);
    setDomains(newDomains);
  };

  const handleSaveChanges = async () => {
    try {
      let payload;

      if (mode == "domains") {
        payload = {
          newUser: {
            ...currProfile,
            domains,
          },
        };
      } else if (mode == "interests") {
        payload = {
          newUser: {
            ...currProfile,
            interests: domains,
          },
        };
      }

      const res = await axios.put(
        `${API_URL}/profile/updateUser/${currProfile?._id}`,
        payload
      );

      setCurrProfile(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (currProfile && mode == "domains") setDomains(currProfile?.domains);
    else if (currProfile && mode == "interests")
      setDomains(currProfile?.interests);
  }, [currProfile]);

  if (matches)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              Edit Domains <SquarePen />
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {domains.map((domain, index) => (
              <Button onClick={() => deleteDomain(index)} key={index}>
                {domain}
              </Button>
            ))}
            <div className="flex gap-1 my-2">
              <Input
                onChange={(e) => setDomain(e.target.value)}
                value={domain}
              />
              <Button variant="outline" onClick={addDomain}>
                <Plus />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center">
            Edit Domains <SquarePen />
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2">
          {domains.map((domain, index) => (
            <Button onClick={() => deleteDomain(index)} key={index}>
              {domain}
            </Button>
          ))}
          <div className="flex gap-1 my-2">
            <Input onChange={(e) => setDomain(e.target.value)} value={domain} />
            <Button variant="outline" onClick={addDomain}>
              <Plus />
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
