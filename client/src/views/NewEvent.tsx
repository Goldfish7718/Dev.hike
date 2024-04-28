import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { API_URL } from "@/main"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { CalendarPlus, Loader2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NewEvent = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useUser()
    const { toast } = useToast()
    const navigate = useNavigate()

    const setDefaultName = () => {
        setOrganiser(user?.fullName as string)
    }

    const requestAddEvent = async () => {
        setLoading(true)
        try {
            await axios.post(`${API_URL}/events/post/${user?.id}`, {
                title,
                description,
                location,
                organiser,
                userRef: user?.id
            })

            navigate('/dashboard')
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
            <div className="flex h-screen justify-center items-center my-12">
                <div className="w-full p-4 sm:w-3/4 md:1/2">
                    <h3 className="mb-4 text-center">New Event</h3>
                    <div className="mb-4 ">                            
                        <Label className="md:text-lg">Event Title :</Label>
                        <Input className="md:text-lg" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Label className="md:text-lg">Event Description :</Label>
                        <Textarea className="md:text-lg" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Label className="md:text-lg">Event Organizer :</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input value={organiser} className="md:text-lg" onChange={e => setOrganiser(e.target.value)} />
                            <Button variant='outline' onClick={setDefaultName}>Use My Default Name</Button>
                        </div>
                        
                    </div>                        
                    <div className="mb-4">
                        <Label className="flex items-center md:text-lg">Event Location :</Label>
                        <Input className="md:text-lg" onChange={e => setLocation(e.target.value)} />   
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={requestAddEvent} className="text-lg my-6 w-full" disabled={loading}>
                            {!loading &&
                                <>
                                    <span>Add Event</span>
                                    <CalendarPlus className="mx-2" size={24} />
                                </>
                            }
                            {loading &&
                                <Loader2 className="animate-spin duration-500" />
                            }
                        </Button>
                    </div>
               </div>
            </div>
        </>
    )
}
export default NewEvent;
