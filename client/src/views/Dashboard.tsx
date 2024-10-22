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
import { Award, Calendar, Loader2, Star, Stars } from "lucide-react";
import ShinyButton from "@/components/ui/shiny-button";
import useGemini from "@/hooks/useGemini";
import FeedSummaryTrigger, {
  FeedSummaryType,
} from "@/components/FeedSummaryTrigger";

interface ExtendedTimelineType extends TimelineType {
  fullname: string;
  imageUrl: string;
}

export type CombinedData =
  | (PostCardProps & { type: "post" })
  | (EventCardProps & { type: "event" })
  | (ExtendedTimelineType & { type: "timeline" });

const Dashboard = () => {
  const [feed, setFeed] = useState<CombinedData[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);

  const { posts, fetchFeedPosts } = usePost();
  const { events, fetchEvents } = useEvent();
  const { currProfile } = useUser();
  const { toast } = useToast();
  const { feedSummary, feedSummaryLoading, requestFeedSummarization } =
    useGemini();

  const fetchFeed = async () => {
    try {
      setFeedLoading(true);
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
    } finally {
      setFeedLoading(false);
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
          <div onClick={() => requestFeedSummarization(feed)} className="my-4">
            {feed.length > 0 && (
              <ShinyButton className="sm:w-2/3 w-full">
                {!feedSummaryLoading && (
                  <span className="flex justify-center">
                    SUMMARIZE FEED
                    <Stars className="mx-2" />
                  </span>
                )}
                {feedSummaryLoading && (
                  <span className="flex justify-center">
                    <Loader2 className="animate-spin duration-300" size={24} />
                  </span>
                )}
              </ShinyButton>
            )}
          </div>
          {feed.length > 0 &&
            feed.map((feedItem) => {
              if (feedItem.type === "post") {
                return (
                  <>
                    <div className="flex gap-1 items-center">
                      <Star size={16} />
                      <h4 className="text-neutral-700 dark:text-neutral-300 text-sm">
                        {feedItem.fullname} posted{" "}
                      </h4>
                    </div>
                    <PostCard {...feedItem} />
                  </>
                );
              } else if (feedItem.type === "event")
                return (
                  <>
                    <div className="flex gap-1 items-center">
                      <Calendar size={16} />
                      <h4 className="text-neutral-700 dark:text-neutral-300 text-sm">
                        New Event
                      </h4>
                    </div>
                    <EventCard {...feedItem} />
                  </>
                );
              else {
                return (
                  <>
                    <div className="flex gap-1 items-center">
                      <Award size={16} />
                      <h4 className="text-neutral-700 dark:text-neutral-300 text-sm">
                        {feedItem.fullname} added to their timeline{" "}
                      </h4>
                    </div>
                    <TimelineCard {...feedItem} className="sm:w-2/3" />
                  </>
                );
              }
            })}
          {feed.length == 0 && (
            <div className="h-screen sm:w-2/3 flex justify-center items-center">
              {!feedLoading && (
                <h3 className="text-neutral-500">Nothing to see here!</h3>
              )}
              {feedLoading && <Loader2 className="animate-spin duration-300" />}
            </div>
          )}
        </TabsContent>
        <TabsContent value="posts">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard {...post} />)
          ) : (
            <div className="h-screen sm:w-2/3 flex justify-center items-center">
              <h3 className="text-neutral-500">Nothing to see here!</h3>
            </div>
          )}
        </TabsContent>
        <TabsContent value="events">
          {events.length > 0 ? (
            events.map((event) => <EventCard {...event} key={event._id} />)
          ) : (
            <div className="h-screen sm:w-2/3 flex justify-center items-center">
              <h3 className="text-neutral-500">Nothing to see here!</h3>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <FeedSummaryTrigger
        dialogOpen={feedSummary ? true : false}
        feedSummary={feedSummary}
      />
    </>
  );
};

export default Dashboard;
