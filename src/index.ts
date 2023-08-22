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

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || '';

const app = express();
const router = new AppRouter(app);

const specs = swaggerJsDoc(options);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.set('port', process.env.PORT || 5000);
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
mongoose.set('strictQuery', false);

router.init();

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error);
  }
}

startApp();
