import { model, Schema } from "mongoose";
import Reply from "./replySchema.js";
import Profile from "./profileSchema.js";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    upvoteRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    downvoteRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    replyRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.post("findOneAndDelete", async function (post) {
  // DELETE REPLIES ON THE DELETED POST
  await Reply.deleteMany({ postRef: post._id });

  // REMOVE POST REFERENCE FROM THE USER
  await Profile.findByIdAndUpdate(post.userRef, {
    $pull: {
      postRefs: post._id,
    },
  });
});

postSchema.post("save", async function (post) {
  // ADD REFERENCE TO PROFILE WHEN A POST IS CREATED
  await Profile.findByIdAndUpdate(post.userRef, {
    $push: { postRefs: post._id },
  });
});

const Post = model("Post", postSchema);
export default Post;
