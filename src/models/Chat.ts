import mongoose, {Schema, Types} from 'mongoose';
import {messageSchema} from "./Message.js";
import {ChatInterface} from "types";

const chatSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 'User' вказує на модель користувача
        messages: [messageSchema],
    },
    { versionKey: false },
);

const Chat = mongoose.model<ChatInterface>('Chat', chatSchema);

export default Chat;