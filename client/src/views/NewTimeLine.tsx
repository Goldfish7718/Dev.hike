import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
    
const NewTimeLine = () => {
    return (
        <>
            <div className="flex justify-center w-full items-center h-screen">
                <div className="w-full p-4 sm:w-3/4 md:1/2">
                    <h3 className="mb-4 text-center">New TimeLine</h3>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Title:</Label>
                        <Input className="text-base md:text-lg"/>
                    </div>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Achievement:</Label>
                        <Textarea className="text-base md:text-lg"/>
                    </div>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Links:</Label>
                        <div className="flex items-center gap-1">
                            <Input className="text-base md:text-lg"/>
                            <Button><Plus /></Button>
                        </div>
                    </div>
                    <div className="flex">
                       <Button className="text-lg my-6 w-full">Add TimeLine</Button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default NewTimeLine