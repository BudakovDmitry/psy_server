// services/fileService.js
import fs from 'fs/promises';
import path from 'path';
import User from "../models/User.js";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url); // Отримуємо поточний файл
const __dirname = path.dirname(__filename); //

export const uploadFile = async (file: Express.Multer.File, uploadDir: any, userId: string) => {

    try {
        const userWithAvatar = await User.findByIdAndUpdate(userId, { avatar: file.filename }, {
            new: true
        });
        console.log('Файл було успішно додано користувачу:', file.filename);
        console.log('userWithAvatar', userWithAvatar)
        return userWithAvatar;
    } catch (error) {
        console.error('Помилка під час завантаження файлу:', error);
        throw error; // Прокидуємо помилку далі для обробки її де-небудь вище
    }
};


// Функція для отримання шляху до зображення за його ім'ям
export const getAvatarPath = (avatarName: string) => {
    return path.join(__dirname, '../uploads', avatarName);
};