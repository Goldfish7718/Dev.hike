import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, SquarePen } from 'lucide-react'
import { Tabs, TabsTrigger,TabsContent, TabsList } from "@/components/ui/tabs"

const Profile = () => {
  return (
    <>
    <div className="mt-20 p-4 px-12 fixed h-screen w-[500px]">
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
    </div>

    <div className="ml-[500px] py-20">
      <Tabs defaultValue="posts" className="px-4">
        <TabsList className="w-full flex justify-evenly">
          <TabsTrigger value="timeline" className="w-full">My Timeline</TabsTrigger>
          <TabsTrigger value="posts" className="w-full">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
            
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