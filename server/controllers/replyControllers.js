import Reply from '../models/replySchema.js'

export const postReply = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const deleteReply = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const getReplies = async (req, res) => {
    try {
        const { postId } = req.params;
        
        const replies = await Reply.find({ postRef: postId })

        res
            .status(200)
            .json({ replies })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}