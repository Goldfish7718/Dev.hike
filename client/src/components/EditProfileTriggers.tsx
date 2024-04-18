import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMediaQuery } from "usehooks-ts"
import { Textarea } from "@/components/ui/textarea"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Check, SquarePen } from "lucide-react"
import { Button } from "./ui/button"
import { EditBioTriggerProps, TriggerProps } from "@/types/types1"
import { useState } from "react"
import axios from "axios"
import { API_URL } from "@/main"
import { useUser as clerkUseUser } from "@clerk/clerk-react"
import { useUser } from "@/context/UserContext"
import { useToast } from "./ui/use-toast"

export const EditBioTrigger = ({ children, bio }: EditBioTriggerProps) => {
    const matches = useMediaQuery('(min-width: 768px)')

    const { currProfile, setCurrProfile  } = useUser()
    const { user } = clerkUseUser()

    const requestBioChange = async () => {
      try {
        const res = await axios.put(`${API_URL}/profile/updateUser/${user?.id}`, {
          newUser: {
            ...currProfile,
            bio: currBio
          }
        })        

        setCurrProfile(res.data.user)
      } catch (error) {
        console.log(error);
      } finally {
        setOpen(false)
      }
    }
    
    const handleOnOpenChange = () => {
      setCurrBio(bio)
      setOpen(!open)
    }

    const [currBio, setCurrBio] = useState(bio);
    const [open, setOpen] = useState(false);

    if (matches)
      return (
        <>
          <Dialog onOpenChange={handleOnOpenChange} open={open} defaultOpen={false}>
            <DialogTrigger asChild>
              {children}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  Edit Bio
                  <SquarePen size={24} className="mx-2" />
                </DialogTitle>
              </DialogHeader>
              <div>
                <Textarea value={currBio} onChange={e => setCurrBio(e.target.value)} />
              </div>
              <div>
                <Button onClick={requestBioChange} className="w-full">Confirm <Check /></Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) 
      
  return (
    <>
      <Drawer onOpenChange={handleOnOpenChange}>
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center">
              Edit Bio
              <SquarePen size={24} className="mx-2" />
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-2 flex flex-col gap-2">
            <div>
              <Textarea value={currBio} onChange={e => setCurrBio(e.target.value)} />
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
  ) 
}

export const EditDomainsTrigger = ({ children }: TriggerProps) => {
  const matches = useMediaQuery('(min-width: 768px)')

  const { currProfile } = useUser()
  const { toast } = useToast()

  const [domain, setDomain] = useState('')
  const [domains, setDomains] = useState<string[]>(currProfile?.domains as string[]);

  const addDomain = (domain: string) => {
    if (domain === " " || !domain) 
      toast({
        title: 'Please Enter a domain!',
        duration: 3000,
        variant: 'destructive'
      })
    else if (domains.length === 8)
      toast({
        title: 'You can app only upto 8 domains!',
        duration: 3000,
        variant: 'destructive'
      })
    else {
      const newDomains = [...domains, domain]
      setDomains(newDomains)
    }
  }

  if (matches)
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">Edit Domains <SquarePen /></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {currProfile?.domains.map((domain, index) => (
              <Button variant="outline" key={index}>{domain}</Button>
            ))
            }
          </div>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center">Edit Domains <SquarePen /></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 m-2">
          {currProfile?.domains.map((domain, index) => (
            <Button variant="outline" key={index}>{domain}</Button>
          ))
          }
        </div>
      </DrawerContent>
    </Drawer>
  )
}
