import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin } from "lucide-react"

const NewEvent = () => {
    return (
        <>
            <div className="flex justify-center mt-20">
                <div className="w-1/2 p-4">
                    <h3 className="mb-4 text-center">New Event</h3>
                    <div className="mb-4 ">                            
                        <Label className="text-base md:text-lg">Event Name :</Label>
                        <Input className="text-base md:text-lg" />
                    </div>
                    <div className="mb-4">
                        <Label className="text-base md:text-lg">Event Description :</Label>
                        <Textarea className="text-base md:text-lg" />
                    </div>                        
                    <div className="mb-4">
                        <Label className="flex items-center text-base md:text-lg">Event Location <MapPin className="mx-1" size={18} /></Label>
                        <Input className="text-base md:text-lg" />
                    </div>
                    <div className="flex justify-end">
                        <Button className="text-lg my-6 w-full">Add Event</Button>
                    </div>
               </div>
            </div>
        </>
    )
}
export default NewEvent;
