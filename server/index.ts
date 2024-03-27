// Creates the express server. Don't run the server from here though!
// Run the server through ts-node server.ts. The reason for this separation
// was so that running the tests and running the live server won't conflict
// with one another.

// THESE ARE NODE APIs WE WISH TO USE
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import path from 'path'
import authRouter from './routes/auth-router'

// CREATE OUR SERVER
dotenv.config({ path: path.resolve(__dirname, '../.env')}); // ty DavidP on SO
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

export default app;