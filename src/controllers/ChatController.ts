// chat.controller.ts

import { Request, Response } from 'express';
import * as chatService from '../services/ChatService.js';
import {MessageInterface} from "types";

// Створення нового чату
export const createChat = async (req: Request, res: Response) => {
    try {
        const { name, participants } = req.body;
        const chat = await chatService.createChat(name, participants);
        res.status(201).json(chat);
    } catch (error: any) {
        console.error('Помилка при створенні чату:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Додавання повідомлення до чату
export const addMessage = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const { sender, content } = req.body;

        const message: MessageInterface = await chatService.addMessage(chatId, sender, content);

        res.status(201).json(message);
    } catch (error: any) {
        console.error('Помилка при додаванні повідомлення:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Отримання чату за ID
export const getChatById = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const chat = await chatService.getChatById(chatId);
        res.status(200).json(chat);
    } catch (error: any) {
        console.error('Помилка при отриманні чату:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getChatByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const chats = await chatService.findChatByUserId(userId);
        res.json(chats);
    } catch (error) {
        console.error('Помилка пошуку чату:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}

// Оновлення чату за ID
export const updateChat = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const { name, participants } = req.body;
        const chat = await chatService.updateChat(chatId, name, participants);
        res.status(200).json(chat);
    } catch (error: any) {
        console.error('Помилка при оновленні чату:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Видалення чату за ID
export const deleteChat = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        await chatService.deleteChat(chatId);
        res.status(204).send();
    } catch (error: any) {
        console.error('Помилка при видаленні чату:', error.message);
        res.status(500).json({ error: error.message });
    }
};
