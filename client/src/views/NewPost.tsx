import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {SquarePen} from "lucide-react"

const NewPost = () => {
  return (
    <>
      <div className="w-full flex justify-center h-screen items-center my-8">
        <div className="w-full p-5 sm:w-3/4 md:1/2">
        <h3 className="justify-center flex items-center">New Post<SquarePen className="mx-2" size={24} /></h3>
        <div className="my-6">                            
          <Label className="text-base">Title: </Label>
          <Input className="text-base" /> 
        </div>
        <div className="mb-6">
          <Label className="text-base">Post: </Label>
          <Textarea className="text-base" />
        </div>
        <div className="flex">
        <Button className="text-lg my-6 w-full">Add TimeLine</Button>
        </div>                       
       </div>
      </div>
    </>
  )
}

export default NewPost