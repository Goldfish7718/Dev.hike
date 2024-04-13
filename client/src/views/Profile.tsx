import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, SquarePen, Github, Twitter, Plus, MessagesSquare, BadgePlus, TriangleAlert, UserRoundX, ArrowBigUp, ArrowBigDown, MessageSquareHeart, Globe, Linkedin, Instagram } from 'lucide-react'
import { Tabs, TabsTrigger,TabsContent, TabsList } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { useUser as clerkUseUser } from "@clerk/clerk-react"
import TimelineCard from "@/components/TimelineCard"
import { useUser } from "@/context/UserContext"
import { useEffect } from "react"

const Profile = () => {

  const navigate = useNavigate()
  const { user } = clerkUseUser()
  const { currProfile, fetchCurrentProfile } = useUser()

  const fallback = `${user?.fullName?.split(' ')[0].slice(0, 1)}${user?.fullName?.split(' ')[1].slice(0, 1)}`

  useEffect(() => {
    fetchCurrentProfile()
  }, [])

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

        {/* ABOUT ME */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">About me <User size={28} className="mx-2" /></CardTitle>
            </CardHeader>
            <Separator/>
            <div className="p-5">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus alias autem itaque expedita tenetur blanditiis eligendi? Iure nostrum atque inventore labore laborum hic! Odit asperiores esse ex officia quo? */}
              {currProfile?.bio}
            </div>
            <Separator/>
            <CardFooter>
              <Button className="mt-5" variant='outline'><SquarePen size={18} className="mx-1" />Edit</Button>
            </CardFooter>
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
                <span className="text-sm">{currProfile?.socials.github}</span>
              </div>
              <div className="flex items-center">
                <Twitter size={18} className="mx-1"/>
                <span className="text-sm">{currProfile?.socials.twitter}</span>
              </div>
              <div className="flex items-center">
                <Linkedin size={18} className="mx-1"/>
                <span className="text-sm">{currProfile?.socials.linkedIn}</span>
              </div>
              <div className="flex items-center">
                <Instagram size={18} className="mx-1"/>
                <span className="text-sm">{currProfile?.socials.instagram}</span>
              </div>
            </div>
            <CardFooter className="mt-3">
              <Button className="w-full" variant="outline">Add Social Link<Plus size={18} className="mx-1"/></Button>
            </CardFooter>
          </Card>
        </div>     

        {/* DOMAINS*/}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">Domains<Globe size={28} className="mx-2" /></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {currProfile?.domains.map((domain, index) => (
                <Button variant="outline" key={index}>{domain}</Button>
              ))
              }
            </CardContent>
            <Separator />
            <CardFooter className="mt-3">
              <Button className="w-full" variant="outline"><SquarePen size={18} className="mx-1"/>Edit</Button>
            </CardFooter>
          </Card>
        </div>

        {/* INTERESTS */}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">Interests<MessageSquareHeart size={28} className="mx-2" /></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {currProfile?.interests.map((interest, index) => (
                <Button variant="outline" key={index}>{interest}</Button>
              ))
              }
            </CardContent>
            <Separator />
            <CardFooter className="mt-3">
              <Button className="w-full" variant="outline"><SquarePen size={18} className="mx-1"/>Edit</Button>
            </CardFooter>
          </Card>
        </div>   

        {/* ADD TO TIMELINE / NEW POST */}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Create<BadgePlus size={28} className="mx-2" />
              </CardTitle>
            </CardHeader>
            <Separator/>
            <div className="p-3 flex flex-col gap-3">
              <Button variant="outline" onClick={()=>navigate('/new/timeline')}>Add to Timeline<Plus size={18} className="mx-1"/></Button>
              <Button variant="outline" onClick={()=>navigate('/new/post')}>New Post<SquarePen size={18} className="mx-1" /></Button>
            </div>
          </Card>
        </div>

        {/* DANGER ZONE */}
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Danger Zone<TriangleAlert size={28} className="mx-2" />
              </CardTitle>
            </CardHeader>
            <Separator/>
            <div className="p-3 flex flex-col gap-3">
              <Button variant="destructive">Delete Account<UserRoundX size={18} className="mx-1" /></Button>
            </div>
          </Card>
        </div>
      </div>

      {/* TIMLINE AND POSTS */}
      <div className="md:my-20 md:w-2/3 w-full">
        <Tabs defaultValue="timeline" className="px-4">
          <TabsList className="w-full flex justify-evenly">
            <TabsTrigger value="timeline" className="w-full">My Timeline</TabsTrigger>
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

export default Profile