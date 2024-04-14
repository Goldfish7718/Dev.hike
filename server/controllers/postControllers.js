import Post from "../models/postSchema.js";

export const getPosts = async (req, res) => {
    try {
        const { userId } = req.params

        const posts = await Post.find({ userRef: userId })

        res
            .status(200)
            .json({ posts })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const addPost = async (req, res) => {
    try {
        const { userId } = req.params
        const { title, content  } = req.body

        const newPost = await Post.create({
            title,
            content,
            userRef: userId
        })

        res
            .status(200)
            .json({ newPost })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        await Post.findByIdAndDelete(postId)

        res 
            .status(200)
            .json({ message: "Post deleted successfully" })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const upvote = async (req, res) => {
    try {
        const { postId, userId } = req.params
        
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { upvoteRefs: userId } },
            { new: true }
        )
        res 
            .status(200)
            .json({ updatedPost })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const downvote = async (req, res) => {
    try {
        const { postId, userId } = req.params
        
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { downvoteRefs: userId } },
            { new: true }
        )
        res 
            .status(200)
            .json({ updatedPost })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

