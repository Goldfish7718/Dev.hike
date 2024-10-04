import Post from "../models/postSchema.js";
import Reply from "../models/replySchema.js";
import clerkClient from "@clerk/clerk-sdk-node";

export const getPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userRef: userId });

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const posts = await Post.find({
      createdAt: {
        $gte: todayStart,
        $lt: todayEnd,
      },
    });

    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        const replies = await Reply.find({ postRef: post._id });

        const transformedReplies = await Promise.all(
          replies.map(async (reply) => {
            const user = await clerkClient.users.getUser(reply.userRef);
            const { imageUrl, firstName, lastName } = user;

            return {
              ...reply.toObject(),
              imageUrl,
              fullname: `${firstName} ${lastName}`,
            };
          })
        );

        return {
          ...post.toObject(),
          replies: transformedReplies,
        };
      })
    );

    res.status(200).json({ posts: transformedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, content } = req.body;

    const newPost = await Post.create({
      title,
      content,
      userRef: userId,
    });

    res.status(200).json({ newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    await Post.findOneAndDelete({ _id: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const upvote = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const postToUpvote = await Post.findById(postId);

    if (postToUpvote.downvoteRefs.includes(userId)) {
      const newDownvoteRefs = postToUpvote.downvoteRefs.filter(
        (downvoteRef) => downvoteRef != userId
      );
      postToUpvote.downvoteRefs = newDownvoteRefs;
      await postToUpvote.save();
    }

    if (postToUpvote.upvoteRefs.includes(userId)) {
      const newUpvoteRefs = postToUpvote.upvoteRefs.filter(
        (upvoteRef) => upvoteRef != userId
      );
      postToUpvote.upvoteRefs = newUpvoteRefs;
      await postToUpvote.save();

      return res.status(200).json({ updatedPost: postToUpvote });
    }

    postToUpvote.upvoteRefs.push(userId);
    await postToUpvote.save();

    res.status(200).json({ updatedPost: postToUpvote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downvote = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const postToDownvote = await Post.findById(postId);

    if (postToDownvote.upvoteRefs.includes(userId)) {
      const newUpvoteRefs = postToDownvote.upvoteRefs.filter(
        (downvoteRef) => downvoteRef != userId
      );
      postToDownvote.upvoteRefs = newUpvoteRefs;
      await postToDownvote.save();
    }

    if (postToDownvote.downvoteRefs.includes(userId)) {
      const newDownvoteRefs = postToDownvote.downvoteRefs.filter(
        (upvoteRef) => upvoteRef != userId
      );
      postToDownvote.downvoteRefs = newDownvoteRefs;
      await postToDownvote.save();

      return res.status(200).json({ updatedPost: postToDownvote });
    }

    postToDownvote.downvoteRefs.push(userId);
    await postToDownvote.save();

    res.status(200).json({ updatedPost: postToDownvote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
