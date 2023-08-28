import {MessageInterface} from "types";
import mongoose, {Schema, Types} from "mongoose";

export const messageSchema =  new mongoose.Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
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
);

const Message = mongoose.model<MessageInterface>('Message', messageSchema);

export default Message;