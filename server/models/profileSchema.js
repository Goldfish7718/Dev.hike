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
        type: String,
      },
    ],
    followingRefs: [
      {
        type: String,
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

  await Event.deleteMany({ userRef: profile._id });
  await Event.findOneAndUpdate(
    { "registrations.userRef": profile._id },
    { $pull: { registrations: { userRef: profile._id } } }
  );

  const deletedReplies = await Reply.deleteMany({ userRef: profile._id });
  console.log(deletedReplies);

  await Post.deleteMany({ userRef: profile._id });
  await Timeline.deleteMany({ userRef: profile._id });
  //   await clerkClient.users.deleteUser(profile.clerkId);
});

const Profile = model("Profile", profileSchema);
export default Profile;
