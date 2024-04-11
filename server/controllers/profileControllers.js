import Profile from '../models/profileSchema.js'

export const initiateProfile = async (req, res) => {
    try {
        const { bio, domains, interests, email, clerkId, socials: { github, twitter, linkedIn, instagram, other } } = req.body;

        const newProfile = await Profile.create({
            bio,
            domains,
            interests,
            email,
            profileInitiated: true,
            socials: {
                github,
                linkedIn,
                instagram,
                other
            },
            profileInitiated: true,
            clerkId
        })

        res
            .status(200)
            .json({ newProfile })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
}