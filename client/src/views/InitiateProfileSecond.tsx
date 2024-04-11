import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { GithubIcon, InstagramIcon, LinkedinIcon, Plus, Twitter, Link, ChevronRight, ChevronLeft} from "lucide-react"
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const InitiateProfileSecond = () => {

  const { handleSocialsChange, postProfileData } = useUser()
  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-center h-screen items-center my-8">
        <div className="w-full p-4 sm:w-3/4 md:w-1/2"> 
          <h3 className="flex items-left justify-start mb-4 text-center gap-2"><Link className="mx-1 my-1" size={24}/> Connect Your Socials</h3> 

          <div className="mb-4 flex flex-row gap-2">
            <Label className="flex items-center text-base md:text-lg mb-1"><GithubIcon className="mx-1" size={24}/> :</Label>
            <Input className="text-base md:text-lg" name="github" onChange={handleSocialsChange} />
          </div>

          <div className="mb-4 flex flex-row gap-2">
            <Label className="flex items-center text-base md:text-lg"><Twitter className="mx-1" size={24}/> :</Label>
            <Input className="text-base md:text-lg" name="twitter" onChange={handleSocialsChange} />
          </div>

          <div className="mb-4 flex flex-row gap-2">
            <Label className="flex items-center text-base md:text-lg"><LinkedinIcon className="mx-1" size={24}/> :</Label>
            <Input className="text-base md:text-lg" name="linkedIn" onChange={handleSocialsChange} />
          </div>

          <div className="mb-4 flex flex-row gap-2">
            <Label className="flex items-center text-base md:text-lg"><InstagramIcon className="mx-1" size={24}/> :</Label>
            <Input className="text-base md:text-lg" name="instagram" onChange={handleSocialsChange} />
          </div>

          <div className="flex items-center mt-4 mb-4 gap-4">
            <Label className="text-base md:text-lg">Other :</Label>
            <Button className="p-1 h-8 w-12"><Plus className="mx-1" size={24}/></Button>
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant='link' className="mt-4 md:text-lg" onClick={() => navigate('/initiate-profile/1')}><ChevronLeft className="mx-2" /> Previous</Button>
            <Button variant='link' className="mt-4 md:text-lg" onClick={postProfileData}>Let's Go! <ChevronRight className="mx-2" /></Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default InitiateProfileSecond;