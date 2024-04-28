import Profile from '../models/profileSchema.js'
import clerkClient from '@clerk/clerk-sdk-node'

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
                twitter,
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

export const fetchUser = async (req, res) => {
    try {
        const { userId, method } = req.params;
        let user;

        if (method === 'clerkId') {
            user = await Profile.findOne({ clerkId: userId })
        } else {
            user = await Profile.findById(userId)
            const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(user.clerkId)
            user = {
                ...user.toObject(),
                fullname: `${firstName} ${lastName}`,
                imageUrl
            }
        }

        res
            .status(200)
            .json({ user })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newUser } = req.body
        
        const user = await Profile.findOneAndUpdate(
            { clerkId: userId },
            newUser,
            { new: true }
        )
        
        res
        .status(200)
        .json({ user })
    } catch (error) {
        console.log(error);   
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        await Profile.findOneAndDelete({ clerkId: userId })
        await clerkClient.users.deleteUser(userId)

        res
            .status(200)
            .json({ message: "User deleted successfully" })
    } catch (error) {
        console.log(error);   
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
}

export const followUser = async (req, res) => {
    try {
        const { userId, followerId } = req.params;

        const userToFollow = await Profile.findById(userId);
        
        if (userToFollow.followerRefs.includes(followerId)) {
            const newFollowerRefs = userToFollow.followerRefs.filter(follower => follower != followerId)
            userToFollow.followerRefs = newFollowerRefs;
            userToFollow.save()

            return res
                .status(200)
                .json({ userToFollow })
        } else {
            userToFollow.followerRefs.push(followerId)
            userToFollow.save()

            return res
                .status(200)
                .json({ user: userToFollow })
        }

    } catch (error) {
        console.log(error);   
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
}