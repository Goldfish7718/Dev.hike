import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Plus, Rocket } from "lucide-react"
import { useState } from "react"
import { useUser } from "@/context/UserContext"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

const InitiateProfileFirst = () => {

  const { 
    domains,
    interests, 
    addDomain, 
    addInterest, 
    setBio,
    removeDomainByIndex, 
    removeInterestByIndex 
  } = useUser()

  const [domain, setDomain] = useState('')
  const [interest, setInterest] = useState('')

  const navigate = useNavigate()

  const callAddDomain = () => {
    addDomain(domain)
    setDomain('')
  }

  const callAddInterest = () => {
    addInterest(interest)
    setInterest('')
  }
  
  return (
    <>
      <div className="w-full flex justify-center h-screen items-center md:mt-8 mt-12">
        <div className="w-full p-5 sm:w-3/4 md:1/2">
          <h3 className="flex items-center justify-center md:justify-start">Tell us more about yourself! <Rocket size={28} className="mx-1" /></h3>

          <div className="md:w-2/3 w-full">
            <div className="my-6">                            
              <Label className="text-base">Bio: </Label>
              <Textarea className="text-base" onChange={e => setBio(e.target.value)} /> 
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full">
                {domains.map((domain, index) => (
                  <Badge variant='secondary' key={index} className="mr-2" onClick={() => removeDomainByIndex(index)}>{domain}</Badge>
                ))
                }
                <div>
                  <Label className="text-base">Domain: </Label>
                  <div className="flex gap-1">
                    <Input value={domain} className="text-base" onChange={e => setDomain(e.target.value)} />
                    <Button onClick={callAddDomain}><Plus /></Button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                {interests.map((interest, index) => (
                  <Badge variant='secondary' className="mr-2" key={index} onClick={() => removeInterestByIndex(index)}>{interest}</Badge>
                ))
                }
                <div>
                  <Label className="text-base">Interests: </Label>
                  <div className="flex gap-1">
                    <Input value={interest} className="text-base" onChange={e => setInterest(e.target.value)} />
                    <Button onClick={callAddInterest}><Plus /></Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="text-lg my-6" variant="link" onClick={() => navigate('/initiate-profile/2')}>Next <ChevronRight className="mx-2" /></Button>
            </div>
          </div>
        </div> 
      </div> 
    </>
  )
}

export default InitiateProfileFirst