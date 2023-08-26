import mongoose, {Types} from 'mongoose';
import Message from "./Message.js";
import {ChatInterface} from "types";

const chatSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        participants: [{ type: Types.ObjectId, ref: 'User' }], // 'User' вказує на модель користувача
        messages: [{ type: Types.ObjectId, ref: 'Message' }],
    },
    { versionKey: false },
);

const Chat = mongoose.model<ChatInterface>('Chat', chatSchema);

export default Chat;