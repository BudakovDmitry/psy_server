// chat.service.ts

import Chat from '../models/Chat.js';
import {MessageInterface} from "../types/types";
import { Types } from 'mongoose';

// Створення нового чату
export const createChat = async (name: string, participants: string[]) => {
    try {
        const chat = new Chat({ name, participants });
        return await chat.save();
    } catch (error) {
        throw new Error('Помилка при створенні чату');
    }
};

// Додавання повідомлення до чату
export const addMessage = async (chatId: string, sender: Types.ObjectId, content: string) => {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new Error('Чат не знайдено');
        }

        const message: MessageInterface = { sender, content, timestamp: new Date() };
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
        const chats = await Chat.find({ participants: userId }); // Шукаємо чати, де користувач є учасником
        return chats;
    } catch (error) {
        console.error('Помилка пошуку чату:', error);
        throw error;
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
