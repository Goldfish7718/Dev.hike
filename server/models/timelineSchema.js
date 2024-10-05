import { model, Schema } from "mongoose";

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

const Timeline = model("Timeline", timelineSchema);
export default Timeline;
