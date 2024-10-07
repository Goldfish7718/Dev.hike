import { ArrowBigDown, ArrowBigUp, MessagesSquare } from "lucide-react";
import ReplyDialogTrigger from "./ReplyDialogTrigger";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { PostCardProps, ReplyType } from "@/types/types1";
import { useState } from "react";
import usePost from "@/hooks/usePost";
import { useUser } from "@/context/UserContext";

const PostCard = (post: PostCardProps) => {
  const [localReplies, setLocalReplies] = useState<ReplyType[]>(post.replies);
  const [localPost, setLocalPost] = useState<PostCardProps>(post);

  const { requestUpvote, requestDownvote } = usePost();
  const { currProfile } = useUser();

  const handleReplies = (updatedReplies: ReplyType[]) => {
    setLocalReplies(updatedReplies);
  };

  const handleUpvote = async () => {
    const updatedPost = await requestUpvote(localPost._id);

    if (updatedPost)
      setLocalPost((prev) => {
        return {
          ...updatedPost,
          replies: prev.replies,
        };
      });
  };

  const handleDownVote = async () => {
    const updatedPost = await requestDownvote(localPost._id);

    if (updatedPost)
      setLocalPost((prev) => {
        return {
          ...updatedPost,
          replies: prev.replies,
        };
      });
  };

  return (
    <Card className="lg:w-2/3 w-full my-4">
      <CardHeader className="flex flex-row gap-4 justify-start items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src="" />
          <AvatarFallback className="flex">PM</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{localPost.title}</CardTitle>
          <Button
            className="dark:text-gray-300 text-gray-900 justify-start p-0"
            variant="link"
            size="sm">
            {localPost.email}
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="mt-4">
          <p>{localPost.content}</p>
        </div>
      </CardContent>
      <Separator />
      <div className="flex">
        <Button
          className={`w-full ${
            localPost.upvoteRefs.includes(currProfile?._id as string)
              ? "text-red-600"
              : null
          }`}
          variant="ghost"
          onClick={handleUpvote}>
          <ArrowBigUp size={24} className="mx-1" />
          {localPost.upvoteRefs.length} Upvotes
        </Button>
        <Button
          className={`w-full ${
            localPost.downvoteRefs.includes(currProfile?._id as string)
              ? "text-red-600"
              : null
          }`}
          variant="ghost"
          onClick={handleDownVote}>
          <ArrowBigDown size={24} className="mx-1" />
          {localPost.downvoteRefs.length} Downvotes
        </Button>
        <ReplyDialogTrigger
          replies={localReplies}
          postId={localPost._id}
          setReplies={handleReplies}>
          <Button className="w-full" variant="ghost">
            <MessagesSquare size={24} className="mx-1" />
            {localPost.replies.length} Replies
          </Button>
        </ReplyDialogTrigger>
      </div>
    </Card>
  );
};

export default PostCard;
