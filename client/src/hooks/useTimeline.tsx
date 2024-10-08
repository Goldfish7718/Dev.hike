import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { API_URL } from "@/main";
import { TimelineType } from "@/types/types1";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseTimelineReturns {
  // DATA
  timeline: TimelineType[];
  loading: boolean;

  // FUNCTIONS
  fetchTimeline: (id: string) => void;
  requestAddToTimeline: (
    title: string,
    content: string,
    tag: string,
    links: string[]
  ) => void;
  requestDeleteTimeline: (timelineId: string) => void;
}

function useTimeline(): UseTimelineReturns {
  const [timeline, setTimeline] = useState<TimelineType[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const { currProfile } = useUser();

  const fetchTimeline = async (id: string) => {
    try {
      const res = await axios.get(`${API_URL}/timeline/get/${id}`);
      setTimeline(res.data.timeline);
    } catch (error) {
      console.log(error);
    }
  };

  const requestAddToTimeline = async (
    title: string,
    content: string,
    tag: string,
    links: string[]
  ) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/timeline/add/${currProfile?._id}`, {
        title,
        content,
        tag,
        links,
      });

      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const requestDeleteTimeline = async (timelineId: string) => {
    try {
      await axios.delete(
        `${API_URL}/timeline/delete/${timelineId}/${currProfile?._id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An Error Occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return {
    timeline,
    loading,

    fetchTimeline,
    requestAddToTimeline,
    requestDeleteTimeline,
  };
}

export default useTimeline;
