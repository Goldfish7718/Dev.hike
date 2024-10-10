import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import usePost from "@/hooks/usePost";
import useEvent from "@/hooks/useEvent";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { API_URL } from "@/main";
import { useToast } from "@/components/ui/use-toast";
import { EventCardProps, PostCardProps, TimelineType } from "@/types/types1";
import TimelineCard from "@/components/TimelineCard";

type CombinedData =
  | (PostCardProps & { type: "post" })
  | (EventCardProps & { type: "event" })
  | (TimelineType & { type: "timeline" });

const Dashboard = () => {
  const [feed, setFeed] = useState<CombinedData[]>([]);
  const { posts, fetchFeedPosts } = usePost();
  const { events, fetchEvents } = useEvent();
  const { currProfile } = useUser();
  const { toast } = useToast();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/profile/fetchFeed/${currProfile?._id}`
      );

      setFeed(res.data.feed);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry an error occured!",
        description: "An error occured while fetching feed",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (currProfile) {
      fetchEvents();
      fetchFeedPosts();
      fetchFeed();
    }
  }, [currProfile]);

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
          {feed.map((feedItem) => {
            if (feedItem.type === "post") return <PostCard {...feedItem} />;
            else if (feedItem.type === "event")
              return <EventCard {...feedItem} />;
            else return <TimelineCard {...feedItem} className="sm:w-2/3" />;
          })}
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
