import { model, Schema } from 'mongoose'

const replySchema = new Schema({
    content: {
        type: String,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    postRef: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, 
{
    timestamps: true
})

const Reply = model('Reply', replySchema)
export default Reply