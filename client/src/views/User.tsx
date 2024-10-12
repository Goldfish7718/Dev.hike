import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  User as LucideUser,
  ArrowBigUp,
  ArrowBigDown,
  MessageSquareHeart,
  UserPlus,
  Globe,
  Check,
  Twitter,
  Github,
  MessagesSquare,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import TimelineCard from "@/components/TimelineCard";
import { API_URL } from "@/main";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserType } from "@/context/UserContext";
import { useParams } from "react-router-dom";
import { ReplyType } from "@/types/types1";
import ReplyDialogTrigger from "@/components/ReplyDialogTrigger";
import { useUser } from "../context/UserContext";
import usePost from "@/hooks/usePost";
import useTimeline from "@/hooks/useTimeline";
import { getInitials } from "@/utils";

const User1 = () => {
  const { toast } = useToast();
  const { userId } = useParams();

  const { currProfile } = useUser();
  const { posts, requestDownvote, requestUpvote, fetchPosts } = usePost();
  const { fetchTimeline, timeline } = useTimeline();

  const [user, setUser] = useState<UserType | null>(null);
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/profile/fetchUser/mongoId/${userId}`
      );
      setUser(res.data.user);
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.response.data.message,
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const fetchReplies = async (postId: string) => {
    setRepliesLoading(true);
    try {
      const res = await axios.get(`${API_URL}/replies/get/${postId}`);
      setReplies(res.data.transformedReplies);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occured!",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setRepliesLoading(false);
    }
  };

  const requestFollow = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/profile/follow/${userId}/${currProfile?._id}`
      );
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTimeline(userId as string);
      fetchPosts(userId as string);
    }
  }, [user]);

  const fallback = getInitials(user?.fullname as string);

  return (
    <>
      <div className="flex item-center md:flex-row flex-col">
        {/* LEFT SIDEBAR */}
        <div className="mt-20 p-4 px-2 md:w-1/3 w-full">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div>
              <Avatar className="h-28 w-28 rounded-full">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
                {/* <AvatarFallback className="text-2xl">TN</AvatarFallback> */}
              </Avatar>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-4xl">{user?.fullname}</h3>

              <div className="flex gap-3 my-1 md:flex-col lg:flex-row">
                <h3 className="font-light">
                  Followers{" "}
                  <span className="font-bold">{user?.followerRefs.length}</span>
                </h3>
                <h3 className="font-light">
                  Following{" "}
                  <span className="font-bold">
                    {user?.followingRefs.length}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          {currProfile?._id !== userId && (
            <div>
              {user?.followerRefs.includes(currProfile?._id as string) ? (
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={requestFollow}>
                  Following
                  <Check size={20} className="mx-1" />
                </Button>
              ) : (
                <Button className="mt-4 w-full" onClick={requestFollow}>
                  Follow
                  <UserPlus size={20} className="mx-1" />
                </Button>
              )}
            </div>
          )}

          {/* ABOUT */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  About {user?.fullname.split(" ")[0]}
                  <LucideUser size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <Separator />
              <div className="p-5">{user?.bio}</div>
            </Card>
          </div>

          {/* SOCIALS */}
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Socials
                  <MessagesSquare size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <Separator />
              <div className="flex flex-col gap-1 p-3">
                <div className="flex items-center">
                  <Github size={18} className="mx-1" />
                  <span className="text-sm">{user?.socials.github}</span>
                </div>
                <div className="flex items-center">
                  <Twitter size={18} className="mx-1" />
                  <span className="text-sm">{user?.socials.twitter}</span>
                </div>
                <div className="flex items-center">
                  <Linkedin size={18} className="mx-1" />
                  <span className="text-sm">{user?.socials.linkedIn}</span>
                </div>
                <div className="flex items-center">
                  <Instagram size={18} className="mx-1" />
                  <span className="text-sm">{user?.socials.instagram}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* DOMAINS*/}
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Domains
                  <Globe size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {user?.domains.map((domain, index) => (
                  <Button variant="outline" key={index}>
                    {domain}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* INTERESTS */}
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Interests
                  <MessageSquareHeart size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {user?.interests.map((interest, index) => (
                  <Button variant="outline" key={index}>
                    {interest}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* TIMLINE AND POSTS */}
        <div className="md:my-20 md:w-2/3 w-full">
          <Tabs defaultValue="timeline" className="px-4">
            <TabsList className="w-full flex justify-evenly">
              <TabsTrigger value="timeline" className="w-full">
                {user?.fullname.split(" ")[0]}'s Timeline
              </TabsTrigger>
              <TabsTrigger value="posts" className="w-full">
                Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="timeline">
              {timeline.map((item) => (
                <TimelineCard key={item._id} {...item} />
              ))}
            </TabsContent>
            <TabsContent value="posts">
              {posts.map((post) => (
                <Card className="w-full my-3" key={post._id}>
                  <CardHeader className="flex flex-row gap-4 justify-start items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" />
                      <AvatarFallback className="flex">
                        {fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle>{post.title}</CardTitle>
                      <Button
                        className="dark:text-gray-300 text-gray-900 justify-start p-0"
                        variant="link"
                        size="sm">
                        {user?.email}
                      </Button>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent>
                    <div className="mt-4">
                      <p>{post.content}</p>
                    </div>
                  </CardContent>
                  <Separator />
                  <div className="flex">
                    <Button
                      onClick={() => requestUpvote(post._id as string)}
                      className={`w-full ${
                        post.upvoteRefs.includes(currProfile?._id as string)
                          ? "text-red-600"
                          : null
                      }`}
                      variant="ghost">
                      <ArrowBigUp size={24} className="mx-1" />
                      {post.upvoteRefs.length} Upvotes
                    </Button>
                    <Button
                      onClick={() => requestDownvote(post._id as string)}
                      className={`w-full ${
                        post.downvoteRefs.includes(currProfile?._id as string)
                          ? "text-red-600"
                          : null
                      }`}
                      variant="ghost">
                      <ArrowBigDown size={24} className="mx-1" />
                      {post.downvoteRefs.length} Downvotes
                    </Button>

                    <ReplyDialogTrigger
                      setReplies={setReplies}
                      loading={repliesLoading}
                      replies={replies}
                      postId={post._id as string}
                      onOpenChange={() => setReplies([])}>
                      <Button
                        className="w-full"
                        variant="ghost"
                        onClick={() => fetchReplies(post._id as string)}>
                        <MessagesSquare size={24} className="mx-1" />
                        {post.replyRefs.length} Replies
                      </Button>
                    </ReplyDialogTrigger>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default User1;
