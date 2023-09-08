import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import AppRouter from './routes/index.js';
import { options } from './swagger.js';
// @ts-ignore
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || '';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

const app = express();
app.use(cors(corsOptions));

const router = new AppRouter(app);

const specs = swaggerJsDoc(options);

// Отримання шляху до поточного файлу
const __filename = fileURLToPath(import.meta.url);

// Отримання директорії, в якій знаходиться поточний файл
const __dirname = dirname(__filename);

app.set('port', process.env.PORT || 5000);
app.use(express.json());
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
mongoose.set('strictQuery', false);

app.use((req, res, next) => {
  const uploadDir = path.join(__dirname, 'uploads');
  req.app.locals.uploadDir = uploadDir;
  next();
});

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: any) => {
  console.log('A user connected');

  socket.on('sendMessage', (data: any) => {
    console.log('Повідомлення отримано:', data);

    // Отримайте дані та надішліть їх іншим клієнтам
    // Наприклад, надіслати повідомлення всім підключеним клієнтам
    io.emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


router.init();

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    server.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error);
  }
}

startApp();
