import { Github, Link, Settings } from "lucide-react"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const TimelineCard = () => {
  return (
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
  )
}

export default TimelineCard