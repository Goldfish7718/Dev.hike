import { model, Schema } from "mongoose";

const profileSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    timelineRefs: {
        type: Schema.Types.ObjectId,
        ref: 'Timelines'
    },
    postRefs: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    },
    profileInitiated1: {
        type: Boolean,
        default: false
    },
    profileInitiated2: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
})

const Profile = model('Profile', profileSchema)
export default Profile