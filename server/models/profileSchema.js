import { model, Schema } from "mongoose";

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

const Profile = model("Profile", profileSchema);
export default Profile;
