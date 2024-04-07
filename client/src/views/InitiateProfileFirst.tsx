import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState } from "react"

const InitiateProfileFirst = () => {

  const [domains, setDomains] = useState([]);
  const [interests, setInterests] = useState([]);

  const [domain, setDomain] = useState('')
  const [interest, setInterest] = useState('')
  
  return (
    <>
      <div className="w-full flex justify-center h-screen items-center my-8">
        <div className="w-full p-5 sm:w-3/4 md:1/2">
          <h3 className="justify-center flex items-center">Profile</h3>
          <div className="my-6">                            
            <Label className="text-base">Bio: </Label>
            <Textarea className="text-base" /> 
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="my-6 w-full">
              <Label className="text-base">Domain: </Label>
              <div className="flex gap-1">
              <Input className="text-base" onChange={e => setDomain(e.target.value)} />
              <Button><Plus /></Button>
              </div>
            </div>
            <div className="my-6 w-full">
              <Label className="text-base">Interests: </Label>
              <div className="flex gap-1">
                <Input className="text-base" onChange={e => setInterest(e.target.value)} />
                <Button><Plus /></Button>
              </div>
            </div>
          </div>  
          <div className="my-6">
            <Label className="text-base">Experiences: </Label>
            <Input className="text-base" />
          </div>
          <div className="flex justify-end">
            <Button className="text-lg my-6 ">Next</Button>
          </div>
        </div> 
      </div> 
    </>
  )
}

export default InitiateProfileFirst