import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, MessageSquare, Settings, Users, ArrowBigDown, ArrowBigUp, Zap, UserRoundPlus } from "lucide-react"
import feed from '@/data/feedData.json'
import posts from '@/data/postData.json'
import events from '@/data/eventData.json'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import EventRegisterTrigger from "@/components/EventRegister"


const Dashboard = () => {

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
              <Card className="lg:w-2/3 w-full my-4">
                <CardHeader className="flex flex-row gap-4 justify-start items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="flex">PM</AvatarFallback>
                  </Avatar>
                  <div  className="flex flex-col">
                    <CardTitle>{post.title}</CardTitle>
                    <Button className="dark:text-gray-300 text-gray-900 justify-start p-0" variant="link" size="sm">{post.username}</Button>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="mt-4">
                    <p>{post.desc}</p>
                    <div className="mt-4 items-center">
                      <Button className="w-1/8 flex gap-2" variant='outline'><Users size={24} className="mx-1"/>{post.tags}</Button>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                  <div className="flex">
                    <Button className="w-full" variant='ghost' ><ArrowBigUp size={24} className="mx-1"/>{post.upvotes} Upvotes</Button>
                    <Button className="w-full" variant='ghost'><ArrowBigDown size={24} className="mx-1"/>{post.downvotes} Downvotes</Button>
                    <Button className="w-full" variant='ghost'><MessageSquare size={24} className="mx-1"/>{post.reply} Reply</Button>
                  </div>
              </Card>
            ))
          }
          </TabsContent>
          <TabsContent value="events">
            {events.data.map(event => (
                <Card className="w-full md:w-2/3 my-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap size={24} className="mx-2"/> {event.eventTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {event.eventDesc}
                    </p>
                    <div className="my-4">
                      <span className="text-gray-400 text-sm">
                        Organized by: {event.eventOrganizer}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex items-center" variant='outline'>
                        <MapPin size={18} className="mx-2" /> {event.eventLocation}
                      </Button>
                      <Button className="flex items-center" variant='outline'>
                        <Users size={18} className="mx-2" /> {event.eventRegistrations}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex flex-col gap-1">
                      <span className="text-gray-400 text-sm">
                        Khushi, Samruddhi and 3 others have participated
                      </span>
                      <EventRegisterTrigger>
                      <Button>
                        <UserRoundPlus size={16} className="mx-2"/>
                        Register
                      </Button>
                      </EventRegisterTrigger>
                     
                    </div>
                  </CardFooter>
                </Card>
              ))
            }
          </TabsContent>
      </Tabs>
    </>
  )
}

export default Dashboard