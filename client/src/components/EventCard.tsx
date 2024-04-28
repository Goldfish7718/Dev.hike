import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Check, MapPin, UserRoundPlus, Users, Zap } from 'lucide-react'
import { Button } from './ui/button'
import EventRegisterTrigger from './EventRegister'
import { EventCardProps } from '@/types/types1'
import { useUser } from '@clerk/clerk-react'

const EventCard = (event: EventCardProps) => {

    const { user } = useUser()

    const userRegistered = () => {
        const potentialUser = event.registrations.find(registration => registration.userRef === user?.id)

        if (potentialUser) return true;
        else return false;
    }

  return (
    <>
        <Card className="w-full md:w-2/3 my-3">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Zap size={24} className="mx-2"/> {event.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    {event.description}
                </p>
                <div className="my-4">
                    <span className="dark:text-gray-400 text-sm text-neutral-800">
                        Organized by: <span className='hover:underline hover:cursor-pointer text-black'>{event.organiser}</span>
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button className="flex items-center" variant='outline'>
                        <MapPin size={18} className="mx-2" /> {event.location}
                    </Button>
                    <Button className="flex items-center" variant='outline'>
                        <Users size={18} className="mx-2" /> {event.registrations.length}
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex flex-col gap-1">
                    <span className="dark:text-gray-400 text-sm text-neutral-800">
                        Khushi, Samruddhi and 3 others have participated
                    </span>
                    {userRegistered() ?
                        <Button variant='secondary'>Registered <Check size={16} className="mx-2" /></Button>
                        :
                        <EventRegisterTrigger {...event}>
                            <Button>
                                <UserRoundPlus size={16} className="mx-2"/>
                                Register
                            </Button>
                        </EventRegisterTrigger>
                    }
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default EventCard