import { model, Schema } from "mongoose";

const profileSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: String,
    timelineRefs: {
        type: Schema.Types.ObjectId,
        ref: 'Timelines'
    },
    postRefs: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    },
    domains: [
        {
            type: String,
        }
    ],
    interests: [
        {
            type: String,
        }
    ],
    socials: {
        github: String,
        twitter: String,
        linkedIn: String,
        instagram: String,
        other: [String]
    },
    profileInitiated: {
        type: Boolean,
        default: false
    },
}, 
{
    timestamps: true
})

const Profile = model('Profile', profileSchema)
export default Profile