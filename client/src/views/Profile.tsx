import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  User,
  SquarePen,
  Github,
  Twitter,
  Plus,
  MessagesSquare,
  BadgePlus,
  TriangleAlert,
  UserRoundX,
  ArrowBigUp,
  ArrowBigDown,
  MessageSquareHeart,
  Globe,
  Linkedin,
  Instagram,
  Trash,
  Calendar,
} from "lucide-react";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useUser as clerkUseUser } from "@clerk/clerk-react";
import TimelineCard from "@/components/TimelineCard";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import {
  EditBioTrigger,
  EditDomainsTrigger,
} from "@/components/EditProfileTriggers";
import { API_URL } from "@/main";
import axios from "axios";
import { ConfirmPostDeleteTriggerProps, ReplyType } from "@/types/types1";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import ReplyDialogTrigger from "@/components/ReplyDialogTrigger";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePost from "@/hooks/usePost";
import useTimeline from "@/hooks/useTimeline";
import { getInitials } from "@/utils";

const Profile = () => {
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = clerkUseUser();
  const { currProfile, requestDeleteProfile } = useUser();
  const { toast } = useToast();
  const { posts, requestDownvote, requestUpvote, fetchPosts } = usePost();
  const { timeline, fetchTimeline } = useTimeline();

  const fallback = getInitials(user?.fullName as string);

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

  useEffect(() => {
    if (currProfile) {
      fetchTimeline(currProfile._id);
      fetchPosts(currProfile._id);
    }
  }, [currProfile]);

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
              </Avatar>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-4xl">{user?.fullName}</h3>
              <div className="flex gap-3 my-1 md:flex-col lg:flex-row">
                <h3 className="font-light">
                  Followers{" "}
                  <span className="font-bold">
                    {currProfile?.followerRefs.length}
                  </span>
                </h3>
                <h3 className="font-light">
                  Following{" "}
                  <span className="font-bold">
                    {currProfile?.followingRefs.length}
                  </span>
                </h3>
              </div>
            </div>
          </div>

          {/* ABOUT ME */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  About me <User size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <Separator />
              <div className="p-5">{currProfile?.bio}</div>
              <Separator />
              <CardFooter>
                <EditBioTrigger bio={currProfile?.bio as string}>
                  <Button className="mt-5" variant="outline">
                    <SquarePen size={18} className="mx-1" />
                    Edit
                  </Button>
                </EditBioTrigger>
              </CardFooter>
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
                {currProfile?.socials.github && (
                  <div className="flex items-center">
                    <Github size={18} className="mx-1" />
                    <span
                      className="text-sm hover:underline hover:decoration-white hover:cursor-pointer"
                      onClick={() =>
                        window.open(currProfile.socials.github, "_blank")
                      }>
                      {currProfile?.socials.github}
                    </span>
                  </div>
                )}
                {currProfile?.socials.twitter && (
                  <div className="flex items-center">
                    <Twitter size={18} className="mx-1" />
                    <span
                      className="text-sm hover:underline hover:decoration-white hover:cursor-pointer"
                      onClick={() =>
                        window.open(currProfile.socials.twitter, "_blank")
                      }>
                      {currProfile?.socials.twitter}
                    </span>
                  </div>
                )}
                {currProfile?.socials.linkedIn && (
                  <div className="flex items-center">
                    <Linkedin size={18} className="mx-1" />
                    <span
                      className="text-sm hover:underline hover:decoration-white hover:cursor-pointer"
                      onClick={() =>
                        window.open(currProfile.socials.linkedIn, "_blank")
                      }>
                      {currProfile?.socials.linkedIn}
                    </span>
                  </div>
                )}
                {currProfile?.socials.instagram && (
                  <div className="flex items-center">
                    <Instagram size={18} className="mx-1" />
                    <span
                      className="text-sm hover:underline hover:decoration-white hover:cursor-pointer"
                      onClick={() =>
                        window.open(currProfile.socials.instagram, "_blank")
                      }>
                      {currProfile?.socials.instagram}
                    </span>
                  </div>
                )}
              </div>
              <CardFooter className="mt-3">
                <Button className="w-full" variant="outline">
                  Add Social Link
                  <Plus size={18} className="mx-1" />
                </Button>
              </CardFooter>
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
                {currProfile?.domains.map((domain, index) => (
                  <Button variant="outline" key={index}>
                    {domain}
                  </Button>
                ))}
              </CardContent>
              <Separator />
              <CardFooter className="mt-3">
                <EditDomainsTrigger mode="domains">
                  <Button className="w-full" variant="outline">
                    <SquarePen size={18} className="mx-1" />
                    Edit
                  </Button>
                </EditDomainsTrigger>
              </CardFooter>
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
                {currProfile?.interests.map((interest, index) => (
                  <Button variant="outline" key={index}>
                    {interest}
                  </Button>
                ))}
              </CardContent>
              <Separator />
              <CardFooter className="mt-3">
                <EditDomainsTrigger mode="interests">
                  <Button className="w-full" variant="outline">
                    <SquarePen size={18} className="mx-1" />
                    Edit
                  </Button>
                </EditDomainsTrigger>
              </CardFooter>
            </Card>
          </div>

          {/* ADD TO TIMELINE / NEW POST */}
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Create
                  <BadgePlus size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <Separator />
              <div className="p-3 flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/new/timeline")}>
                  Add to Timeline
                  <Plus size={18} className="mx-1" />
                </Button>
                <Button variant="outline" onClick={() => navigate("/new/post")}>
                  New Post
                  <SquarePen size={18} className="mx-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/new/event")}>
                  New Event
                  <Calendar size={18} className="mx-1" />
                </Button>
              </div>
            </Card>
          </div>

          {/* DANGER ZONE */}
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Danger Zone
                  <TriangleAlert size={28} className="mx-2" />
                </CardTitle>
              </CardHeader>
              <Separator />
              <div className="p-3 flex flex-col gap-3">
                <Button variant="destructive" onClick={requestDeleteProfile}>
                  Delete Account
                  <UserRoundX size={18} className="mx-1" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* TIMLINE AND POSTS */}
        <div className="md:my-20 md:w-2/3 w-full">
          <Tabs defaultValue="timeline" className="px-4">
            <TabsList className="w-full flex justify-evenly">
              <TabsTrigger value="timeline" className="w-full">
                My Timeline
              </TabsTrigger>
              <TabsTrigger value="posts" className="w-full">
                Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="timeline">
              {timeline.length > 0 ? (
                timeline.map((item) => (
                  <TimelineCard key={item._id} {...item} />
                ))
              ) : (
                <div className="h-screen flex flex-col justify-center items-center gap-4">
                  <h3 className="text-neutral-500">
                    You haven't added anything to your timeline yet.
                  </h3>
                  <Button
                    variant="outline"
                    className="text-neutral-500"
                    onClick={() => navigate("/new/timeline")}>
                    Add to Timeline <Plus size={18} className="mx-2" />
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="posts">
              {posts.length > 0 ? (
                posts.map((post) => (
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
                          {user?.emailAddresses[0].emailAddress}
                        </Button>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                      <div className="mt-4">
                        <p>{post.content}</p>
                        <ConfirmPostDeleteTrigger postId={post._id as string}>
                          <Button variant="outline" className="mt-2">
                            Delete <Trash className="mx-2" size={18} />
                          </Button>
                        </ConfirmPostDeleteTrigger>
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
                ))
              ) : (
                <div className="h-screen flex flex-col justify-center items-center gap-4">
                  <h3 className="text-neutral-500">
                    You haven't posted anything yet.
                  </h3>
                  <Button
                    variant="outline"
                    className="text-neutral-500"
                    onClick={() => navigate("/new/post")}>
                    New Post <SquarePen size={18} className="mx-2" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export const ConfirmPostDeleteTrigger = ({
  children,
  postId,
}: ConfirmPostDeleteTriggerProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const { user } = clerkUseUser();
  const { requestDeletePost } = usePost();

  if (matches)
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <div className="m-2 w-full">
            <p>Are you sure you want to delete this post?</p>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button>No</Button>
            </DialogClose>
            <Button
              onClick={() => requestDeletePost(postId, user?.id as string)}
              variant="destructive">
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Delete Post</DrawerTitle>
        </DrawerHeader>
        <div className="m-2 w-full">
          <p>Are you sure you want to delete this post?</p>
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">No</Button>
          </DrawerClose>
          <Button
            onClick={() => requestDeletePost(postId, user?.id as string)}
            className="w-full"
            variant="destructive">
            Yes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Profile;
