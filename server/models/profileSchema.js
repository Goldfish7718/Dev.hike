import clerkClient from "@clerk/clerk-sdk-node";
import { model, Schema } from "mongoose";
import Event from "./eventSchema.js";
import Reply from "./replySchema.js";
import Post from "./postSchema.js";
import Timeline from "./timelineSchema.js";

const profileSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    followerRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    followingRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: String,
    timelineRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timeline",
      },
    ],
    postRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    domains: [
      {
        type: String,
      },
    ],
    interests: [
      {
        type: String,
      },
    ],
    socials: {
      github: String,
      twitter: String,
      linkedIn: String,
      instagram: String,
      other: [String],
    },
    profileInitiated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.post("findOneAndDelete", async function (profile) {
  console.log(profile);

  // DELETE EVENTS CREATED BY USER
  await Event.deleteMany({ userRef: profile._id });

  // DELETE REFERENCES OF USER IN EVENTS IT HAS REGISTERED IN
  await Event.updateMany(
    { "registrations.userRef": profile._id },
    { $pull: { registrations: { userRef: profile._id } } }
  );

  // EXTRACT REPLY ID'S OF THE REPLIES THAT USER HAS CREATED
  const repliesTobeDeleted = await Reply.find({ userRef: profile._id });
  const replyRefsToBeDeleted = repliesTobeDeleted.map((reply) => reply._id);

  // DELETE ALL REPLIES MADE BY THE USER
  await Reply.deleteMany({ userRef: profile._id });

  // REMOVE REFERENCES OF THE REPLIES BY THE USER IN ALL POSTS
  // REMOVE UPVOTE AND DOWNVOTE REFERENCES BY THE USERS ON OTHER POSTS
  await Post.updateMany(
    {
      $or: [
        { upvoteRefs: { $in: profile._id } },
        { downvoteRefs: { $in: profile._id } },
        { replyRefs: { $in: replyRefsToBeDeleted } },
      ],
    },
    {
      $pull: {
        replyRefs: {
          $in: repliesTobeDeleted,
        },
        upvoteRefs: profile._id,
        downvoteRefs: profile._id,
      },
    }
  );

  // DELETE POSTS AND ITS ASSOCIATED REPLIES CREATED BY THE USER
  const postsToDeleted = await Post.find({ userRef: profile._id });
  const postIds = postsToDeleted.map((post) => post._id);

  await Reply.deleteMany({ postRef: { $in: postIds } });
  await Post.deleteMany({ userRef: profile._id });

  // DELETE ALL TIMELINES CREATED BY THE USER
  await Timeline.deleteMany({ userRef: profile._id });

  // DELETE REFERENCES USER FROM FOLLOWING AND FOLLOWERS IN OTHER PROFILES
  await Profile.updateMany(
    {
      $or: [{ followerRefs: profile._id }, { followingRefs: profile._id }],
    },
    {
      $pull: {
        followerRefs: profile._id,
        followingRefs: profile._id,
      },
    }
  );

  // DELETE USER FROM CLERK
  await clerkClient.users.deleteUser(profile.clerkId);
});

const Profile = model("Profile", profileSchema);
export default Profile;
