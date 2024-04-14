import { model, Schema } from 'mongoose'

const eventSchema = new Schema({
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
            type: String,
        }
    ]
},
{
    timestamps: true
}) 

const Event = model('Event', eventSchema)
export default Event