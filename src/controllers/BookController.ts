

import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/BookService';
import { QueryOptions } from '../repositories/interfaces/IBookRepository';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }


    getAllBooks = (req: Request, res: Response, next: NextFunction): void => {
        try {

            const options: QueryOptions = {
                search: req.query.search as string,
                genre: req.query.genre as string,
                sortBy: req.query.sortBy as 'title' | 'year' | 'price',
                order: req.query.order as 'asc' | 'desc',
                page: req.query.page ? parseInt(req.query.page as string) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string) : undefined
            };

            const result = this.bookService.getAllBooks(options);

            res.status(200).json({
                status: 'success',
                ...result
            });
        } catch (error) {
            next(error);
        }
    };


    getBookById = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { id } = req.params;
            const book = this.bookService.getBookById(id);

            res.status(200).json({
                status: 'success',
                data: book
            });
        } catch (error) {
            next(error);
        }
    };


    createBook = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const bookData = req.body;
            const newBook = this.bookService.createBook(bookData);

            res.status(201).json({
                status: 'success',
                message: 'Book created successfully',
                data: newBook
            });
        } catch (error) {
            next(error);
        }
    };

    updateBook = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedBook = this.bookService.updateBook(id, updateData);

            res.status(200).json({
                status: 'success',
                message: 'Book updated successfully',
                data: updatedBook
            });
        } catch (error) {
            next(error);
        }
    };


    deleteBook = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { id } = req.params;
            this.bookService.deleteBook(id);

            res.status(200).json({
                status: 'success',
                message: 'Book deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    };
}
