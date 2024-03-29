import {
    Dialog,
    DialogContent,
    DialogDescription,
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

interface EventRegisterProps {
  children: React.ReactNode;
}  

const EventRegisterTrigger = ({ children }: EventRegisterProps) => {
  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register for TFUG</DialogTitle>
                  <DialogDescription>
                    This is a machine learning event!
                  </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <div>
                    <Label>
                      First Name:
                    </Label>
                    <Input />
                  </div>

                  <div>
                    <Label>
                      Last Name:  
                    </Label>
                    <Input />
                  </div>
                </div>

                <RadioGroup defaultValue="solo" className="flex">
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem value="solo"/>
                    <Label>Solo</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem value="team"/>
                    <Label>Team</Label>
                  </div>
                </RadioGroup>

                <div className="my-2">
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
}

export default EventRegisterTrigger