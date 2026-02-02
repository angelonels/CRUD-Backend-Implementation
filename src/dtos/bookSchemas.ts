

import { z } from 'zod';


export const createBookSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters'),
    author: z
        .string()
        .min(1, 'Author is required')
        .max(100, 'Author must be less than 100 characters'),
    genre: z
        .string()
        .min(1, 'Genre is required')
        .max(50, 'Genre must be less than 50 characters'),
    year: z
        .number()
        .int('Year must be an integer')
        .min(1000, 'Year must be at least 1000')
        .max(new Date().getFullYear(), 'Year cannot be in the future'),
    price: z
        .number()
        .positive('Price must be a positive number')
        .max(10000, 'Price must be less than 10000')
});

export const updateBookSchema = z.object({
    title: z
        .string()
        .min(1, 'Title cannot be empty')
        .max(200, 'Title must be less than 200 characters')
        .optional(),
    author: z
        .string()
        .min(1, 'Author cannot be empty')
        .max(100, 'Author must be less than 100 characters')
        .optional(),
    genre: z
        .string()
        .min(1, 'Genre cannot be empty')
        .max(50, 'Genre must be less than 50 characters')
        .optional(),
    year: z
        .number()
        .int('Year must be an integer')
        .min(1000, 'Year must be at least 1000')
        .max(new Date().getFullYear(), 'Year cannot be in the future')
        .optional(),
    price: z
        .number()
        .positive('Price must be a positive number')
        .max(10000, 'Price must be less than 10000')
        .optional()
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
