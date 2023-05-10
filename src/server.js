import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import {
    logger,
    accessLogger,
    expressErrorLogger,
} from './services/loggingService.js';
import graphRouter from './routes/graphRoutes.js';
import crawlerRouter from './routes/crawlerRoutes.js';
import authRouter from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { connectDB } from './models/database/database.js';
import { ensureAuthorization } from './middleware/ensureAuthorization.js';
import { assignPrivilege } from './middleware/assignPrivilege.js';
import { isBanned } from './middleware/isBanned.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true, limit: '1mb' }));
app.use(accessLogger);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Home' });
});
app.use('/static', express.static('public'));
app.use('/auth', authRouter);
app.use('/api/crawler', crawlerRouter);
app.use('/temp/graphs', graphRouter);

app.use(ensureAuthorization);
app.use(isBanned);
app.use(assignPrivilege);
app.use('/api/graphs', graphRouter);
app.use('/admin', adminRoutes);

app.use(expressErrorLogger);

app.listen(3000, async () => {
    await connectDB();
    logger.info('🌐 Listening to port 3000');
    logger.info('⚡ http://localhost:3000');
});
