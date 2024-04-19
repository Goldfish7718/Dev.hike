import { Award, Check, Link, Settings, Sparkles, Star } from "lucide-react"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { TimelineType } from "@/types/types1"

const TimelineCard = ({ title, content, links, tag, date }: TimelineType) => {

  const icons = [
    <Star size={24} className="mx-3" />,
    <Check size={24} className="mx-3" />,
    <Award size={24} className="mx-3" />,
    <Sparkles size={24} className="mx-3" />,
  ]

  return (
    <Card className="w-full my-3">
        <CardHeader>
        <CardTitle className="flex items-center">
            {/* <Star size={24} className="mx-3"/> */}
            {icons[Math.floor(Math.random() * 4)]}
            <span>{title}</span> 
            <div className="ml-auto">
            <span className="text-sm  text-gray-400">{date}</span>   
            </div>   
        </CardTitle>
        </CardHeader>
        <div className="p-5">
        <div>
            <p>{content}</p>
        </div>
        <Button className="mt-4" variant="outline"><Settings size={18} className="mx-2"/>{tag}</Button>
        </div>
        <CardFooter>
        <div className="flex flex-col gap-1">
          {links.map(link => (
              <div className="flex items-center">
                <Link size={12} className="mx-1"/>
                <span className="text-sm">{link}</span>
              </div>
            ))
          }
            {/* <div className="flex items-center">
            <Link size={12} className="mx-1"/>
            <span className="text-sm">https://something.com</span>
            </div> */}
        </div>
        </CardFooter>
    </Card>
  )
}

export default TimelineCard