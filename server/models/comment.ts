import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema(
    {
        senderId: {type: ObjectId, ref: 'User'},
        text: {type: String, required: true},
        sendDate: {type: Date, default: new Date()},
    },
    { timestamps: true },
)

export const Comment = mongoose.model('Comments', CommentSchema)