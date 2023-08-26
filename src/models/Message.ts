import {MessageInterface} from "types";
import mongoose, {Types} from "mongoose";
import User from "./User.js";

const messageSchema =  new mongoose.Schema(
    {
        sender: {
            type: Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        },
    },
    { _id: false }
);

const Message = mongoose.model<MessageInterface>('message', messageSchema);

export default Message;