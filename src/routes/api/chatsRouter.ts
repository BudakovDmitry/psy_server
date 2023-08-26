import express from 'express';
import * as ChatController from '../../controllers/ChatController.js';

const router = express.Router();

// Маршрут для створення нового чату
router.post('', ChatController.createChat);

// Маршрут для додавання повідомлення до чату
router.post('/:chatId/messages', ChatController.addMessage);

// Маршрут для отримання чату за ID
router.get('/:chatId', ChatController.getChatById);

router.get('/user/:userId', ChatController.getChatByUserId);

// Маршрут для оновлення чату за ID
router.put('/:chatId', ChatController.updateChat);

// Маршрут для видалення чату за ID
router.delete('/:chatId', ChatController.deleteChat);

export default router;