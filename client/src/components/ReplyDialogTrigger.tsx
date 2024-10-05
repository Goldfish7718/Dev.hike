import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Loader2, MessagesSquare, SendHorizonal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMediaQuery } from "usehooks-ts";
import { ReplyDialogTriggerProps } from "@/types/types1";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { API_URL } from "@/main";
import { useUser } from "@/context/UserContext";

const ReplyDialogTrigger = ({
  children,
  replies,
  postId,
  onOpenChange,
  loading,
  setReplies,
}: ReplyDialogTriggerProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const { currProfile } = useUser();
  const { toast } = useToast();

  const [reply, setReply] = useState("");

  const postReply = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/replies/reply/${postId}/${currProfile?._id}`,
        {
          content: reply,
        }
      );
      console.log(res.data);

      const newReplies = [res.data.replyInResponse, ...replies];
      setReplies(newReplies);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  if (matches)
    return (
      <>
        <Dialog onOpenChange={onOpenChange}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex">
                Replies
                <MessagesSquare size={24} className="mx-2" />
              </DialogTitle>
            </DialogHeader>
            <div>
              <ScrollArea className="h-96">
                {loading && (
                  <div className="flex items-center justify-center h-full">
                    <Loader2
                      size={48}
                      className="animate-spin duration-500 my-auto"
                    />
                  </div>
                )}
                {!loading && replies.length === 0 && <h2>No replies</h2>}
                {replies.length > 0 &&
                  replies.map((reply) => (
                    <>
                      <Card className="my-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={reply.imageUrl} />
                              <AvatarFallback className="font-light text-lg">
                                SM
                              </AvatarFallback>
                            </Avatar>
                            {reply.fullname}
                          </CardTitle>
                        </CardHeader>
                        <div className="px-5 mb-5">{reply.content}</div>
                      </Card>
                    </>
                  ))}
              </ScrollArea>

              <div className="mt-4 mx-2 flex gap-2">
                <Input
                  placeholder="Reply"
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button onClick={postReply}>
                  <SendHorizonal />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );

  return (
    <Drawer onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex">
            Replies
            <MessagesSquare size={24} className="mx-2" />
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ScrollArea className="h-96">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2
                  size={48}
                  className="animate-spin duration-500 my-auto"
                />
              </div>
            )}
            {!loading && replies.length === 0 && <h2>No replies</h2>}
            {replies.length > 0 &&
              replies.map((reply) => (
                <>
                  <Card className="my-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={reply.imageUrl} />
                          <AvatarFallback className="font-light text-lg">
                            SM
                          </AvatarFallback>
                        </Avatar>
                        {reply.fullname}
                      </CardTitle>
                    </CardHeader>
                    <div className="px-5 mb-5">{reply.content}</div>
                  </Card>
                </>
              ))}
          </ScrollArea>

          <div className="mt-4 mx-2 flex gap-2">
            <Input
              placeholder="Reply"
              onChange={(e) => setReply(e.target.value)}
            />
            <Button onClick={postReply}>
              <SendHorizonal />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReplyDialogTrigger;
