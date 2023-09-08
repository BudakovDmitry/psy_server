// routes/fileRoutes.js
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { upload, getAvatar } from '../../controllers/FileController.js';
import { fileURLToPath } from 'url'; // Додаємо fileURLToPath

const __filename = fileURLToPath(import.meta.url); // Отримуємо поточний файл
const __dirname = path.dirname(__filename); //

const uploadDir = path.join(__dirname, '../../uploads'); // Коректний абсолютний шлях для завантаження файлів
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Встановлюємо абсолютний шлях
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const router: Router = Router();
const uploadMiddleware = multer({ storage: storage });

router.post('/upload', uploadMiddleware.single('avatar'), upload);
router.get('/avatar/:avatarName', getAvatar);

export default router;