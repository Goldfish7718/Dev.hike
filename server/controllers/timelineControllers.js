import Timeline from "../models/timelineSchema.js" 

export const getTimeline = async (req, res) => {
    try {
        // EXTRACT THE USER ID FROM PARAMETERS KAR!!!!! BRO COME BACK
        const { userId } = req.params

        const timeline = await Timeline.find({ userRef: userId })

        res
            .status(200)
            .json({ timeline })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const addToTimeline = async (req, res) => {
    try {
        const { userId } = req.params
        const{ title, content, links, tag } = req.body

        const newTimeline = await Timeline.create({
            title, 
            userId, 
            content, 
            links, 
            tag,
            userRef: userId
        })

        res
            .status(200)
            .json({ newTimeline })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const deleteFromTimeline = async (req, res) => {
    try {
        const { timelineId } = req.params
        await Timeline.findByIdAndDelete(timelineId)

        res
            .status(200)
            .json({ message: "Timeline post deleted successfully" })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}