import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User as LucideUser, ArrowBigUp, ArrowBigDown, MessageSquareHeart, UserPlus, Globe, Check, Slack, Twitter, Github, MessagesSquare } from 'lucide-react'
import { Tabs, TabsTrigger,TabsContent, TabsList } from "@/components/ui/tabs"
import { useUser } from "@clerk/clerk-react"
import TimelineCard from "@/components/TimelineCard"

const User1 = () => {

  const { user } = useUser()
  const fallback = `${user?.fullName?.split(' ')[0].slice(0, 1)}${user?.fullName?.split(' ')[1].slice(0, 1)}`

  return (
    <>
    <div className="flex item-center md:flex-row flex-col">
      {/* LEFT SIDEBAR */}
      <div className="mt-20 p-4 px-2 md:w-1/3 w-full">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div>
            <Avatar className="h-28 w-28 rounded-full">
              <AvatarImage src=""/>
              <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-4xl">{user?.fullName}</h3>
            <div className="flex gap-3 my-1 md:flex-col lg:flex-row">
              <h3 className="font-light">Followers <span className="font-bold">569</span></h3>
              <h3 className="font-light">Following <span className="font-bold">786</span></h3>
            </div>
          </div>
        </div>
        <div>
        <div> 
          <Button className="mt-4 w-full">Follow<UserPlus size={20} className="mx-1"/></Button>  
          <Button className="mt-4 w-full" variant="outline">Following<Check size={20} className="mx-1"/></Button>  
        </div>  
        </div>

        {/* ABOUT */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">About Tejas<LucideUser size={28} className="mx-2" /></CardTitle>
            </CardHeader>
            <Separator/>
            <div className="p-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus alias autem itaque expedita tenetur blanditiis eligendi? Iure nostrum atque inventore labore laborum hic! Odit asperiores esse ex officia quo?
            </div>
          </Card>
        </div>

        {/* SOCIALS */}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Socials<MessagesSquare size={28} className="mx-2" /> 
              </CardTitle>
            </CardHeader>
            <Separator/>
            <div className="flex flex-col gap-1 p-3">
              <div className="flex items-center">
                <Github size={18} className="mx-1"/>
                <span className="text-sm">https://www.github.com/catch-cookies-code/Dev.hike</span>
              </div>
              <div className="flex items-center">
                <Twitter size={18} className="mx-1"/>
                <span className="text-sm">https://www.github.com/catch-cookies-code/Dev.hike</span>
              </div>
              <div className="flex items-center">
                <Slack size={18} className="mx-1"/>
                <span className="text-sm">https://www.github.com/catch-cookies-code/Dev.hike</span>
              </div>
            </div>
          </Card>
        </div>

        {/* DOMAINS*/}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">Domains<Globe size={28} className="mx-2" /></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline">Web Development</Button>
              <Button variant="outline">Machine Learning</Button>
              <Button variant="outline">Cyber Security</Button>
            </CardContent>
          </Card>
        </div>

        {/* INTERESTS */}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">Interests<MessageSquareHeart size={28} className="mx-2" /></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline">Collaboration</Button>
              <Button variant="outline">Project Building</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TIMLINE AND POSTS */}
      <div className="md:my-20 md:w-2/3 w-full">
        <Tabs defaultValue="timeline" className="px-4">
          <TabsList className="w-full flex justify-evenly">
            <TabsTrigger value="timeline" className="w-full">Khushi's Timeline</TabsTrigger>
            <TabsTrigger value="posts" className="w-full">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <TimelineCard />
          </TabsContent>
          <TabsContent value="posts">
            <Card className="w-full my-3">
              <CardHeader className="flex flex-row gap-4 justify-start items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="flex">PM</AvatarFallback>
                </Avatar>
                <div  className="flex flex-col">
                  <CardTitle>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, quas?
                  </CardTitle>
                  <Button className="dark:text-gray-300 text-gray-900 justify-start p-0" variant="link" size="sm">catch-cookies-code</Button>
                </div>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className="mt-4">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iste. Officiis dicta tempore a enim explicabo praesentium repudiandae neque ipsum aut aliquid porro temporibus dignissimos voluptatem repellat, quas numquam voluptate sed doloremque, ut quibusdam, soluta sunt at dolorem! Quod laborum facere voluptate omnis quisquam fuga culpa facilis nihil officiis nulla.</p>
                </div>
              </CardContent>
              <Separator />
              <div className="flex">
                <Button className="w-full" variant='ghost' ><ArrowBigUp size={24} className="mx-1"/>71 Upvotes</Button>
                <Button className="w-full" variant='ghost'><ArrowBigDown size={24} className="mx-1"/>5 Downvotes</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  )
}

export default User1