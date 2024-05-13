import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PasswordResetTokenSchema = new Schema(
    {
        token: {type: String, required: true}
    },
    { timestamps: true },
)

export const PasswordResetToken = mongoose.model('PasswordResetToken', PasswordResetTokenSchema)