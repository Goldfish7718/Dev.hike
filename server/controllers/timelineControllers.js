import Timeline from "../models/timelineSchema.js";
import Profile from "../models/profileSchema.js";
import convertDate from "../utils/convertDate.js";

export const getTimeline = async (req, res) => {
  try {
    const { userId } = req.params;

    let timeline = await Timeline.find({ userRef: userId }).sort({
      createdAt: -1,
    });
    timeline = timeline.map((item) => {
      return {
        ...item.toObject(),
        date: convertDate(item.createdAt.toLocaleDateString()),
      };
    });

    res.status(200).json({ timeline });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToTimeline = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, content, links, tag } = req.body;

    const newTimeline = await Timeline.create({
      title,
      userId,
      content,
      links,
      tag,
      userRef: userId,
    });

    await Profile.findOneAndUpdate(
      { clerkId: userId },
      {
        $push: {
          timelineRefs: newTimeline._id,
        },
      },
      { new: true }
    );

    res.status(200).json({ newTimeline });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFromTimeline = async (req, res) => {
  try {
    const { timelineId, userId } = req.params;

    const deletedTimeline = await Timeline.findByIdAndDelete(timelineId);

    await Profile.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          timelineRefs: deletedTimeline._id,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Timeline post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
