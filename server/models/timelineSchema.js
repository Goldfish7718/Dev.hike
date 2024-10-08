import { model, Schema } from "mongoose";
import Profile from "./profileSchema.js";

const timelineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: String,
    links: [
      {
        type: String,
      },
    ],
    userRef: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

timelineSchema.post("save", async function (timeline) {
  await Profile.findByIdAndUpdate(timeline.userRef, {
    $push: {
      timelineRefs: timeline._id,
    },
  });
});

timelineSchema.post("findOneAndDelete", async function (timeline) {
  await Profile.findByIdAndUpdate(timeline.userRef, {
    $pull: {
      timelineRefs: timeline._id,
    },
  });
});

const Timeline = model("Timeline", timelineSchema);
export default Timeline;
