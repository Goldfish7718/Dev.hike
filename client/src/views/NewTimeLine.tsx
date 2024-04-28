import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { API_URL } from "@/main"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { Link, Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
    
const NewTimeLine = () => {

    const [link, setLink] = useState('');
    const [links, setLinks] = useState<string[]>([]);
    const [tag, setTag] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const { user } = useUser()
    const navigate  = useNavigate()

    const addLink = () => {
        const newLinks = [...links, link]
        setLinks(newLinks)
        setLink('')
    }

    const removeLinkByIndex = (index: number) => {
        setLinks(prevItems => {
            return [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
        });
    };

    const requestAddToTimeline = async () => {
        setLoading(true)
        try {
            await axios.post(`${API_URL}/timeline/add/${user?.id}`, {
                title,
                content,
                tag,
                links
            })
            
            navigate('/profile')
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex justify-center w-full items-center h-screen my-8">
                <div className="w-full p-4 sm:w-3/4 md:1/2">
                    <h3 className="mb-4 text-center">New TimeLine</h3>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Title:</Label>
                        <Input className="text-base md:text-lg" onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Content:</Label>
                        <Textarea className="text-base md:text-lg" onChange={e => setContent(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Tag:</Label>
                        <Input className="text-base md:text-lg" onChange={e => setTag(e.target.value)}/>
                    </div>
                    <div className="my-3">
                        {links.map((link, index) => (
                            <div className="flex items-center my-1 hover:cursor-pointer" key={index} onClick={() => removeLinkByIndex(index)}>
                                <Link className="mx-1" size={18} />
                                <span>{link}</span>
                            </div>
                        ))
                        }
                    </div>
                    <div className="mb-2">
                        <Label className="text-base md:text-lg">Links:</Label>
                        <div className="flex items-center gap-1">
                            <Input value={link} className="text-base md:text-lg" onChange={e => setLink(e.target.value)}/>
                            <Button onClick={addLink}><Plus /></Button>
                        </div>
                    </div>
                    <div className="flex">
                       <Button onClick={requestAddToTimeline} className="text-lg my-6 w-full">
                            {!loading && 'Add to TimeLine'}
                            {loading && <Loader2 className="animate-spin duration-500" />}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default NewTimeLine