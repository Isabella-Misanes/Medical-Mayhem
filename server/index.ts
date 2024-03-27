// THESE ARE NODE APIs WE WISH TO USE
import express, { Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import authRouter from './routes/auth-router'

// CREATE OUR SERVER
dotenv.config()
export const PORT = process.env.PORT || 4000;
export const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
app.use('/auth', authRouter)

// INITIALIZE OUR DATABASE OBJECT
// const db = require('./db')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app;