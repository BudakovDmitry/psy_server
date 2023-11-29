import mongoose from 'mongoose';
import {messageSchema} from "./Message.js";
import {userSchema} from "./User.js";
import {ChatInterface} from "types";

const chatSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        participants: [userSchema],
        messages: [messageSchema],
    },
    { versionKey: false },
);

const Chat = mongoose.model<ChatInterface>('Chat', chatSchema);

export default Chat;