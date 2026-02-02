

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    console.error('Error:', err.message);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong. Please try again later.'
    });
};
