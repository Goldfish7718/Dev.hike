import { model, Schema } from 'mongoose'

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,

    },
    userRef: {
        type: String,
        ref: 'Profile'
    },
    upvoteRefs: [
        {
            type: String,
            ref: 'Profile'
        }
    ],
    downvoteRefs: [
        {
            type: String,
            ref: 'Profile'
        }
    ],
    replyRefs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reply'
        }
    ],
}, 
{
    timestamps: true
})

const Post = model('Post', postSchema)
export default Post