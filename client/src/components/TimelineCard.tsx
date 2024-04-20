import { Award, Check, Link, Settings, Sparkles, Star, Trash } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ConfirmTimeLineDeleteTriggerProps, TimelineType } from "@/types/types1"
import { Separator } from "./ui/separator"
import { useUser } from "@clerk/clerk-react"
import { useMediaQuery } from "usehooks-ts"
import { useToast } from "./ui/use-toast"
import axios from "axios"
import { API_URL } from "@/main"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"

const TimelineCard = ({ title, content, links, tag, date, userRef, _id }: TimelineType) => {

  const icons = [
    <Star size={24} className="mx-3" />,
    <Check size={24} className="mx-3" />,
    <Award size={24} className="mx-3" />,
    <Sparkles size={24} className="mx-3" />,
  ]

  const { user } = useUser()

  return (
    <Card className="w-full my-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          {icons[Math.floor(Math.random() * 4)]}
          <span>{title}</span> 
          <div className="ml-auto">
            <span className="text-sm  text-gray-400">{date}</span>   
          </div>   
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-5">
          <div>
            <p>{content}</p>
          </div>
          <Button className="mt-4" variant="outline"><Settings size={18} className="mx-2"/>{tag}</Button>
        </div>
        <div className="flex flex-col gap-1 mx-5">
          {links.map(link => (
            <div className="flex items-center">
                <Link size={12} className="mx-1" />
                <span className="text-sm hover:cursor-pointer hover:underline" onClick={() => window.location.href = link}>{link}</span>
              </div>
            ))
          }
        </div>
      </CardContent>
      {userRef === user?.id && 
        <>
          <Separator />
          <CardFooter>
            <div>
              <ConfirmTimeLineDeleteTrigger timelineId={_id}>
                <Button className="mt-4" variant='destructive'>Delete from Timeline <Trash size={24} className="mx-2" /></Button>
              </ConfirmTimeLineDeleteTrigger>
            </div>
          </CardFooter>
        </>
      }
    </Card>
  )
}

const ConfirmTimeLineDeleteTrigger = ({ children, timelineId }: ConfirmTimeLineDeleteTriggerProps) => {
  const matches = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()
  const { user } = useUser()

  const requestDeleteTimeline = async () => {
    try {
      await axios.delete(`${API_URL}/timeline/delete/${timelineId}/${user?.id}`)
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An Error Occured!",
        duration: 3000,
        variant: 'destructive'
      })
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
            <DialogTitle>Delete from Timeline</DialogTitle>
          </DialogHeader>
          <div className="m-2 w-full">
            <p>Are you sure you want to delete this post from your Timeline?</p>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button>No</Button>
            </DialogClose>
            <Button onClick={requestDeleteTimeline} variant='destructive'>Yes</Button>
          </DialogFooter>
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
          <DrawerTitle>Delete from Timeline</DrawerTitle>
        </DrawerHeader>
        <div className="m-2 w-full">
          <p>Are you sure you want to delete this post from your Timeline?</p>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">No</Button>
          </DrawerClose>
          <Button onClick={requestDeleteTimeline} className="w-full" variant='destructive'>Yes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TimelineCard