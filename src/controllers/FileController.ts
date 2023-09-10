// controllers/fileController.js
import { uploadFile, getAvatarPath } from '../services/FileService.js';
import {Request, Response, Express} from "express";
import fs from 'fs';

export const upload = async (req: Request, res: Response) => {
    try {
        const file: Express.Multer.File = req.file as Express.Multer.File;
        const userId = req.body._id

        const { uploadDir } = req.app.locals; // отримуємо uploadDir з конфігурації Express
        if(!userId) {
            res.status(500).json({ error: 'Обов\'язково потрібен id користувача' });
        }

        const user = await uploadFile(file, uploadDir, userId);
        console.log('fileName', user)
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Помилка завантаження файлу' });
    }
};


// Функція для відправки зображення як відповідь на запит
export const getAvatar = (req: Request, res: Response) => {
    const avatarName = req.params.avatarName;
    const avatarPath = getAvatarPath(avatarName);

    // Перевірка наявності файлу
    if (fs.existsSync(avatarPath)) {
        // Відправляємо зображення як відповідь
        res.sendFile(avatarPath);
    } else {
        // Якщо файл не знайдено, відправляємо помилку
        res.status(404).json({ error: 'Зображення не знайдено' });
    }
};
