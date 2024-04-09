import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Plus, UserRoundPlus } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"

interface EventRegisterProps {
children: React.ReactNode;
}  

const EventRegisterTrigger = ({ children }: EventRegisterProps) => {

  const matches = useMediaQuery('(min-width: 768px)')

  if (matches)
    return (
      <>
        <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                <DialogTitle>Register for TFUG</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label>
                      First Name:
                    </Label>
                    <Input />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>
                      Last Name:  
                    </Label>
                    <Input />
                  </div>
                </div>

                <RadioGroup defaultValue="solo" className="flex mt-2 gap-3">
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
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="px-3 w-full">Register <UserRoundPlus size={16} className="mx-1" /></Button>
              </DialogFooter>  
            </DialogContent>
          </Dialog>
      </>
    )

  return (
    <>
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Register for TFUG</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>
                First Name:
              </Label>
              <Input />
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                Last Name:  
              </Label>
              <Input />
            </div>
          </div>

          <RadioGroup defaultValue="solo" className="flex mt-2 gap-3">
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
          </div>
        </div>
        <DrawerFooter>
          <Button type="submit" className="px-3 w-full">Register <UserRoundPlus size={16} className="mx-1" /></Button>
        </DrawerFooter>  
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default EventRegisterTrigger