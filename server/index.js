import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

config()

const app = express()
const PORT = 5000

if (process.env.ORIGIN) {
    app.use(cors({
        credentials: true,
        origin: process.env.ORIGIN
    }))
} else {
    app.use(cors())
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectDB = async (url) => {
    await mongoose
        .connect(url)
        .then(() => console.log("Database Connected"))
        .catch(err => console.log(err))
}

app.listen(PORT, async () => {
    await connectDB(process.env.DB_URI || 'mongodb://0.0.0.0:27017/Devhike')
    console.log(`Server started on port ${PORT}`);    
})
