import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarPlus } from "lucide-react"

const NewEvent = () => {
    return (
        <>
            <div className="flex justify-center h-screen items-center">
                <div className="w-full p-4 sm:w-3/4 md:1/2">
                    <h3 className="mb-4 text-center">New Event</h3>
                    <div className="mb-4 ">                            
                        <Label className="text-base md:text-lg">Event Title :</Label>
                        <Input className="text-base md:text-lg" />
                    </div>
                    <div className="mb-4">
                        <Label className="text-base md:text-lg">Event Description :</Label>
                        <Textarea className="text-base md:text-lg" />
                    </div>
                    <div className="mb-4">
                        <Label className="text-base md:text-lg">Event Organizer :</Label>
                        <div className="flex gap-2">
                            <Input className="text-base md:text-lg" />
                            <Button variant='outline'>Use My Default Name</Button>
                        </div>
                        
                    </div>                        
                    <div className="mb-4">
                        <Label className="flex items-center text-base md:text-lg">Event Location :</Label>
                        <Input className="text-base md:text-lg" />   
                    </div>
                    <div className="flex justify-end">
                        <Button className="text-lg my-6 w-full">Add Event<CalendarPlus className="mx-2" size={24} /></Button>
                    </div>
               </div>
            </div>
        </>
    )
}
export default NewEvent;
