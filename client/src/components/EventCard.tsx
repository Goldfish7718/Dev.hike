import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { MapPin, UserRoundPlus, Users, Zap } from 'lucide-react'
import { Button } from './ui/button'
import EventRegisterTrigger from './EventRegister'
import { EventCardProps } from '@/types/types1'

const EventCard = (event: EventCardProps) => {
  return (
    <>
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
                    <span className="dark:text-gray-400 text-sm text-neutral-800">
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
                    <span className="dark:text-gray-400 text-sm text-neutral-800">
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
    </>
  )
}

export default EventCard