import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

mongoose
    .connect(process.env.DB_CONNECT as string, { useNewUrlParser: true } as ConnectOptions)
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db