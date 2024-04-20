import Event from "../models/eventSchema.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({})

        res
            .status(200)
            .json({ events })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const addEvent = async (req, res) => {
    try {
        const { title, description, organiser, location } = req.body 
        const { userRef } = req.params

        const newEvent = await Event.create({
            title,
            description,
            organiser,
            location,
            userRef
        })

        res
            .status(200)
            .json({ newEvent }) 
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params

        await Event.findByIdAndDelete(eventId)

        res 
            .status(200)
            .json({ message: "Event deleted Successfully" })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const registerEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.params;
        const { firstName, lastname } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $push: { registrations: userId } },
            { new: true }
        )

        res
            .status(200)
            .json({ updatedEvent }) 
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}