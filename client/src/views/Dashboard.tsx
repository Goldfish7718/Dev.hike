import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import PostCard from "@/components/PostCard";
import { EventCardProps } from "@/types/types1";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/main";
import axios from "axios";
import usePost from "@/hooks/usePost";

const Dashboard = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);

  const { toast } = useToast();
  const { posts, fetchFeedPosts } = usePost();

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

  useEffect(() => {
    fetchEvents();
    fetchFeedPosts();
  }, []);

  return (
    <>
      <Tabs defaultValue="feed" className="">
        <TabsList className="w-full md:w-2/3 justify-evenly">
          <TabsTrigger value="feed" className="w-full">
            Feed
          </TabsTrigger>
          <TabsTrigger value="events" className="w-full">
            Events
          </TabsTrigger>
          <TabsTrigger value="posts" className="w-full">
            Posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          {posts.map((post) => (
            <PostCard {...post} />
          ))}
        </TabsContent>
        <TabsContent value="posts">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard {...post} />)
          ) : (
            <>No Posts to show</>
          )}
        </TabsContent>
        <TabsContent value="events">
          {events.map((event) => (
            <EventCard {...event} key={event._id} />
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
