import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import usePost from "@/hooks/usePost";
import { Loader2, SquarePen } from "lucide-react";
import { useState } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { loading, requestAddPost } = usePost();

  return (
    <>
      <div className="w-full flex justify-center h-screen items-center my-8">
        <div className="w-full p-5 sm:w-3/4 md:1/2">
          <h3 className="justify-center flex items-center">
            New Post
            <SquarePen className="mx-2" size={24} />
          </h3>
          <div className="my-6">
            <Label className="text-base">Title: </Label>
            <Input
              className="text-base"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label className="text-base">Content: </Label>
            <Textarea
              className="text-base"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button
              onClick={() => requestAddPost(title, content)}
              className="text-lg my-6 w-full"
              disabled={loading}>
              {!loading && "Post"}
              {loading && <Loader2 className="animate-spin duration-500" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
