import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { API_URL } from "@/main"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { Loader2, SquarePen } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NewPost = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast()
  const { user } = useUser()
  const navigate = useNavigate()

  const requestAddPost = async () => {
    setLoading(true)
    try {
      if (!title || !content) {
        toast({
          title: "Please provide all fields!",
          duration: 3000,
          variant: 'destructive'
        })

        return;
      }

      const res = await axios.post(`${API_URL}/posts/post/${user?.id}`, {
        title,
        content
      })

      console.log(res);
      navigate('/profile')
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occured!",
        duration: 3000,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="w-full flex justify-center h-screen items-center my-8">
        <div className="w-full p-5 sm:w-3/4 md:1/2">
        <h3 className="justify-center flex items-center">New Post<SquarePen className="mx-2" size={24} /></h3>
        <div className="my-6">                            
          <Label className="text-base">Title: </Label>
          <Input className="text-base" onChange={e => setTitle(e.target.value)} /> 
        </div>
        <div className="mb-6">
          <Label className="text-base">Content: </Label>
          <Textarea className="text-base" onChange={e => setContent(e.target.value)} />
        </div>
        <div className="flex">
          <Button onClick={requestAddPost} className="text-lg my-6 w-full" disabled={loading}>
            {!loading && 'Post'}
            {loading && <Loader2 className="animate-spin duration-500" />}
          </Button>
        </div>                       
       </div>
      </div>
    </>
  )
}

export default NewPost