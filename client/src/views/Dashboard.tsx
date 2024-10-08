import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import PostCard from "@/components/PostCard";
import { useEffect } from "react";
import usePost from "@/hooks/usePost";
import useEvent from "@/hooks/useEvent";

const Dashboard = () => {
  const { posts, fetchFeedPosts } = usePost();
  const { events, fetchEvents } = useEvent();

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
