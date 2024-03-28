import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, SquarePen, Github, Settings, Link, Twitter, Slack } from 'lucide-react'
import { Tabs, TabsTrigger,TabsContent, TabsList } from "@/components/ui/tabs"

const Profile = () => {
  return (
    <>
      <div className="my-20 p-4 px-8 fixed h-screen hidden md:block md:w-[300px] lg:w-[500px] overflow-y-scroll">
        <div className="flex items-center gap-3">
          <Avatar className="h-28 w-28 rounded-full">
            <AvatarImage src=""/>
            <AvatarFallback className="text-2xl">KK</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-4xl">Khushi Kshatriya</h3>
            <div className="flex gap-3 my-1">
              <h3 className="font-light">Followers <span className="font-bold">569</span></h3>
              <h3 className="font-light">Following <span className="font-bold">786</span></h3>
            </div>
          </div>
          <br/>
        </div>
        
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

        <div className="my-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Socials:
              </CardTitle>
            </CardHeader>
            <Separator/>
            <div className="flex flex-col gap-1 p-5">
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
      </div>

      <div className="md:ml-[300px] lg:ml-[500px] py-20">
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
            HI Mom
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Profile