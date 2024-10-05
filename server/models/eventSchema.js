import { model, Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organiser: {
      type: String,
      reqiured: true,
    },
    location: {
      type: String,
      required: true,
    },
    registrations: [
      {
        userRef: {
          type: Schema.Types.ObjectId,
          ref: "Profile",
        },
        firstName: String,
        lastName: String,
      },
    ],
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);
export default Event;
