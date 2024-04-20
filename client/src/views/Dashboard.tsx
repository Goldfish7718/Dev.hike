import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, MessageSquare, Settings, Users } from "lucide-react"
import feed from '@/data/feedData.json'
import posts from '@/data/postData.json'
// import events from '@/data/eventData.json'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import EventCard from "@/components/EventCard"
import PostCard from "@/components/PostCard"
import { EventCardProps } from "@/types/types1"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { API_URL } from "@/main"
import axios from "axios"


const Dashboard = () => {

  const [events, setEvents] = useState<EventCardProps[]>([]);

  const { toast } = useToast()

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/events/get`)
      console.log(res.data);
      setEvents(res.data.events)
    } catch (error) {
      console.log(error);
      toast({
        title: 'Sorry! An Error occured!',
        duration: 3000,
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <>
      <Tabs defaultValue="feed" className="">
        <TabsList className="w-full md:w-2/3 justify-evenly">
          <TabsTrigger value="feed" className="w-full">Feed</TabsTrigger>
          <TabsTrigger value="events" className="w-full">Events</TabsTrigger>
          <TabsTrigger value="posts" className="w-full">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          {feed.data.map(post => (
              <Card className="lg:w-2/3 w-full my-4">
                <CardHeader className="flex flex-row gap-4 justify-start">
                  <Avatar>
                    <AvatarImage src={post.imageUrl} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <CardTitle>{post.title}</CardTitle>
                    <Button className="dark:text-gray-300 text-gray-900 justify-start p-0" variant='link' size='sm'>John Doe</Button>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="mt-4">
                    <p>{post.description}</p>
                  </div>
                </CardContent>
                <Separator />
                <div className="flex justify-evenly">
                  <Button className="w-full rounded-none" variant='ghost'><Heart size={18} className="mx-1" />48</Button>
                  <Button className="w-full rounded-none" variant='ghost'><MessageSquare size={18} className="mx-1" />21</Button>
                  <Button className="w-full rounded-none" variant='ghost'><Users size={18} className="mx-1" />4</Button>
                </div>
                <Separator />
                <CardFooter>
                  <div className="mt-4 flex gap-2">
                    <Button variant='outline'><MapPin size={18} className="mx-1" /> {post.location}</Button>
                    <Button variant='outline'><Settings size={18} className="mx-1" /> {post.tag}</Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          }
        </TabsContent>
        <TabsContent value="posts">
          {posts.data.map(post => (
              <PostCard {...post} />
            ))
          }
          </TabsContent>
          <TabsContent value="events">
            {events.map(event => (
                <EventCard {...event} />
              ))
            }
          </TabsContent>
      </Tabs>
    </>
  )
}

export default Dashboard