

import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(helmet());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Book Library API',
        version: '1.0.0',
        endpoints: {
            books: '/api/books'
        }
    });
});

app.use('/api/books', bookRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
});

app.use(errorHandler);

export default app;
