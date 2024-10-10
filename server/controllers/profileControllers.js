import Post from "../models/postSchema.js";
import Profile from "../models/profileSchema.js";
import clerkClient from "@clerk/clerk-sdk-node";
import Timeline from "../models/timelineSchema.js";
import Event from "../models/eventSchema.js";
import Reply from "../models/replySchema.js";

export const initiateProfile = async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      profileInitiated: true,
    });

    res.status(200).json({ newProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { userId, method } = req.params;
    let user;

    if (method === "clerkId") {
      user = await Profile.findOne({ clerkId: userId });
    } else {
      user = await Profile.findById(userId);
      const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
        user.clerkId
      );
      user = {
        ...user.toObject(),
        fullname: `${firstName} ${lastName}`,
        imageUrl,
      };
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUser } = req.body;

    const user = await Profile.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await Profile.findOneAndDelete({ clerkId: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { userId, followerId } = req.params;

    let userToFollow = await Profile.findById(userId);
    let followingUser = await Profile.findById(followerId);

    if (userToFollow.followerRefs.includes(followerId)) {
      const newFollowerRefs = userToFollow.followerRefs.filter(
        (follower) => follower != followerId
      );

      const newFollowingRefs = followingUser.followingRefs.filter(
        (following) => following != userId
      );

      userToFollow.followerRefs = newFollowerRefs;
      followingUser.followingRefs = newFollowingRefs;

      await userToFollow.save();
      await followingUser.save();
    } else {
      userToFollow.followerRefs.push(followerId);
      followingUser.followingRefs.push(userId);

      await userToFollow.save();
      await followingUser.save();
    }

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userToFollow.clerkId
    );

    userToFollow = {
      ...userToFollow.toObject(),
      fullname: `${firstName} ${lastName}`,
      imageUrl,
    };

    return res.status(200).json({ user: userToFollow });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchFeed = async (req, res) => {
  try {
    const { userId } = req.params;

    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const user = await Profile.findById(userId);

    let [posts, events, timelines] = await Promise.all([
      Post.find({
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      }).lean(),
      Event.find({
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      }).lean(),
      Timeline.find({
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      }).lean(),
    ]);

    posts = posts
      .filter(
        (post) =>
          post.userRef.toString() == user._id.toString() ||
          user.followingRefs.includes(post.userRef)
      )
      .map((post) => ({ ...post, type: "post" }));

    events = events.map((event) => ({ ...event, type: "event" }));

    timelines = timelines
      .filter(
        (timeline) =>
          timeline.userRef.toString() == user._id.toString() ||
          user.followingRefs.includes(timeline.userRef)
      )
      .map((timeline) => ({ ...timeline, type: "timeline" }));

    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        const replies = await Reply.find({ postRef: post._id });

        const transformedReplies = await Promise.all(
          replies.map(async (reply) => {
            const dbUser = await Profile.findById(reply.userRef);
            const user = await clerkClient.users.getUser(dbUser.clerkId);
            const { imageUrl, firstName, lastName } = user;

            return {
              ...reply.toObject(),
              imageUrl,
              fullname: `${firstName} ${lastName}`,
            };
          })
        );

        return {
          ...post,
          replies: transformedReplies,
        };
      })
    );

    const combinedData = [...transformedPosts, ...events, ...timelines];
    combinedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.status(200).json({ feed: combinedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
