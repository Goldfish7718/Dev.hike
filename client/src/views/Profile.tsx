import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, SquarePen, Github, Settings, Link, Twitter, Slack, Plus, MessagesSquare, BadgePlus, TriangleAlert, Repeat, UserRoundX, ArrowBigUp, ArrowBigDown } from 'lucide-react'
import { Tabs, TabsTrigger,TabsContent, TabsList } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="flex item-center md:flex-row flex-col">
      {/* LEFT SIDEBAR */}
      <div className="my-20 p-4 px-2 h-screen md:w-1/3 w-full">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div>
            <Avatar className="h-28 w-28 rounded-full">
              <AvatarImage src=""/>
              <AvatarFallback className="text-2xl">KK</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-4xl">Khushi Kshatriya</h3>
            <div className="flex gap-3 my-1">
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus alias autem itaque expedita tenetur blanditiis eligendi? Iure nostrum atque inventore labore laborum hic! Odit asperiores esse ex officia quo?
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
            <CardFooter className="mt-3">
              <Button className="w-full" variant="outline">Add Social Link<Plus size={18} className="mx-1"/></Button>
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
        <div className="my-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Danger Zone<TriangleAlert size={28} className="mx-2" />
              </CardTitle>
            </CardHeader>
            <Separator/>
            <div className="p-3 flex flex-col gap-3">
              <Button variant="destructive">Change Password<Repeat size={18} className="mx-1"/></Button>
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
            <Card className="w-full my-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Github size={24} className="mx-3"/>
                  <span>Successfully completed Dev.hike project!</span> 
                  <div className="ml-auto">
                    <span className="text-sm  text-gray-400">21st June 2023</span>   
                  </div>   
                </CardTitle>
              </CardHeader>
              <div className="p-5">
                <div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim sequi natus alias quaerat quos labore magni quas, officia perspiciatis, ipsa, accusamus consequatur veritatis? Tempora mollitia odit fugiat, velit impedit possimus sint vel soluta consectetur voluptatem praesentium doloremque, saepe voluptatibus? Excepturi est in accusantium esse vero corrupti omnis consequuntur? Commodi libero, voluptates velit provident iusto quia cum minus nisi quam quae non, delectus quibusdam error aperiam praesentium quos illo itaque quasi fuga perspiciatis ex, in suscipit. Eum possimus necessitatibus molestias quam atque cum ratione consectetur? Atque doloribus quam expedita et eum deleniti aliquam perferendis porro! Ex natus optio fuga. Provident, doloribus.</p>
                </div>
                <Button className="mt-4" variant="outline"><Settings size={18} className="mx-2"/>Web Development</Button>
              </div>
              <CardFooter>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Link size={12} className="mx-1"/>
                    <span className="text-sm">https://www.github.com/catch-cookies-code/Dev.hike</span>
                  </div>
                  <div className="flex items-center">
                    <Link size={12} className="mx-1"/>
                    <span className="text-sm">https://something.com</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="posts">
            <Card className="w-full my-3">
                <CardHeader className="flex flex-row gap-4 justify-start items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="flex">PM</AvatarFallback>
                  </Avatar>
                  <div  className="flex flex-col">
                    <CardTitle></CardTitle>
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