import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { API_URL } from "@/main";
import { EventCardProps } from "@/types/types1";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseEventReturns {
  // DATA
  events: EventCardProps[];
  loading: boolean;

  // FUNCTIONS
  fetchEvents: () => void;
  requestRegistration: (
    firstName: string,
    lastName: string,
    _id: string
  ) => void;
  requestAddEvent: (
    title: string,
    description: string,
    organiser: string,
    location: string
  ) => void;
}

function useEvent(): UseEventReturns {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { currProfile } = useUser();

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/events/get`);
      setEvents(res.data.events);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An Error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const requestRegistration = async (
    firstName: string,
    lastName: string,
    _id: string
  ) => {
    try {
      await axios.post(
        `${API_URL}/events/register/${_id}/${currProfile?._id}`,
        {
          firstName,
          lastName,
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An Error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const requestAddEvent = async (
    title: string,
    description: string,
    organiser: string,
    location: string
  ) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/events/post/${currProfile?._id}`, {
        title,
        description,
        location,
        organiser,
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occured!",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,

    fetchEvents,
    requestRegistration,
    requestAddEvent,
  };
}

export default useEvent;
