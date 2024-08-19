import { verifyToken } from '@clerk/backend';

export default async function authenticateToken(req, res, next) {
    try {
        const { __session } = req.cookies;

        if (!__session) {
            return res.status(401).json({ message: "No session token found" });
        }

        await verifyToken(__session, {
            secretKey: process.env.CLERK_SECRET_KEY
        });


        next();
    } catch (error) {
        console.log(error);
        if (error.reason == "token-invalid")
            return res.status(401).json({ message: "Invalid or expired session token" });

        return res.status(500).json({ message: "Internal server error" });
    }
}