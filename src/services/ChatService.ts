// chat.service.ts

import Chat from '../models/Chat.js';
import {MessageInterface} from "../types/types";
import {Types} from 'mongoose';
import Message from "../models/Message.js";
import User from "../models/User.js";

// Створення нового чату
export const createChat = async (name: string, participants: string[]) => {
    try {
        const users = await User.find({ _id: { $in: participants }})
        const chat = new Chat({ name, participants: users });
        return await chat.save();
    } catch (error) {
        console.log('error', error);
        throw new Error('Помилка при створенні чату');
    }
};

// Додавання повідомлення до чату
export const addMessage = async (chatId: string, sender: Types.ObjectId, content: string, _id: string, timestamp: Date) => {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new Error('Чат не знайдено');
        }

        const senderObjectId = new Types.ObjectId(sender);

        const message: MessageInterface = new Message({ sender: senderObjectId, content, timestamp, _id });
        chat.messages.push(message);

        await chat.save();
        return message;
    } catch (error) {
        throw new Error('Помилка при додаванні повідомлення');
    }
};

// Отримання чату за ID
export const getChatById = async (chatId: string) => {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new Error('Чат не знайдено');
        }
        return chat;
    } catch (error) {
        throw new Error('Помилка при отриманні чату');
    }
};

export const findChatByUserId = async (userId: string) => {
    try {
        return await Chat.find({'participants._id': userId});
    } catch (error) {
        console.error('Помилка пошуку чату:', error);
        throw new Error('Помилка пошуку чату');
    }
}

// Оновлення чату за ID
export const updateChat = async (chatId: string, name: string, participants: string[]) => {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new Error('Чат не знайдено');
        }

        // Перетворіть масив participants на масив Types.ObjectId
        const participantIds = participants.map(participant => new Types.ObjectId(participant));

        chat.name = name;
        chat.participants = participantIds;
        await chat.save();
        return chat;
    } catch (error) {
        throw new Error('Помилка при оновленні чату');
    }
};

// Видалення чату за ID
export const deleteChat = async (chatId: string) => {
    try {
        await Chat.findByIdAndDelete(chatId);
    } catch (error) {
        throw new Error('Помилка при видаленні чату');
    }
};
