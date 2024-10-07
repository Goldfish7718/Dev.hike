import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { API_URL } from "@/main";
import { PostCardProps } from "@/types/types1";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UsePostReturns {
  // DATA
  posts: PostCardProps[];
  setPosts: Function;
  loading: boolean;

  // FUNCTIONS
  fetchPosts: (userId: string) => void;
  fetchFeedPosts: () => void;
  requestAddPost: (title: string, content: string) => void;
  requestDeletePost: (postId: string, userId: string) => void;
  requestUpvote: (postId: string) => Promise<PostCardProps | null>;
  requestDownvote: (postId: string) => Promise<PostCardProps | null>;
}

function usePost(): UsePostReturns {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { currProfile } = useUser();
  const navigate = useNavigate();

  const fetchPosts = async (userId: string) => {
    try {
      const res = await axios.get(`${API_URL}/posts/get/${userId}`);
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry an error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const fetchFeedPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts/get/feed-posts`);
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An Error occured!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const requestAddPost = async (title: string, content: string) => {
    setLoading(true);
    try {
      if (!title || !content) {
        toast({
          title: "Please provide all fields!",
          duration: 3000,
          variant: "destructive",
        });

        return;
      }

      const res = await axios.post(
        `${API_URL}/posts/post/${currProfile?._id}`,
        {
          title,
          content,
        }
      );

      console.log(res);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occured!",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const requestDeletePost = async (postId: string, userId: string) => {
    try {
      await axios.delete(`${API_URL}/posts/delete/${postId}/${userId}`);
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

  const requestUpvote = async (postId: string) => {
    try {
      const res = await axios.post(
        `${API_URL}/posts/upvote/${postId}/${currProfile?._id}`
      );

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return res.data.updatedPost;
        }
        return post;
      });

      setPosts(updatedPosts);
      return res.data.updatedPost;
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occurred!",
        duration: 3000,
        variant: "destructive",
      });
      // Return the old post to avoid undefined issues
      return posts.find((post) => post._id === postId) || null;
    }
  };

  const requestDownvote = async (postId: string) => {
    try {
      const res = await axios.post(
        `${API_URL}/posts/downvote/${postId}/${currProfile?._id}`
      );

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return res.data.updatedPost;
        }
        return post;
      });

      setPosts(updatedPosts);
      return res.data.updatedPost;
    } catch (error) {
      console.log(error);
      toast({
        title: "Sorry! An error occurred!",
        duration: 3000,
        variant: "destructive",
      });
      // Return the old post to avoid undefined issues
      return posts.find((post) => post._id === postId) || null;
    }
  };

  return {
    posts,
    setPosts,
    loading,

    fetchPosts,
    fetchFeedPosts,
    requestAddPost,
    requestDeletePost,
    requestUpvote,
    requestDownvote,
  };
}

export default usePost;
