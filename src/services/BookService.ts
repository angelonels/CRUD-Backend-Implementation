

import { Book, CreateBookData, UpdateBookData } from '../models/Book';
import { BookRepository } from '../repositories/BookRepository';
import { QueryOptions, PaginatedResult } from '../repositories/interfaces/IBookRepository';
import { AppError } from '../utils/AppError';

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    getAllBooks(options?: QueryOptions): PaginatedResult<Book> {
        return this.bookRepository.findAll(options);
    }

    getBookById(id: string): Book {
        const book = this.bookRepository.findById(id);

        if (!book) {
            throw new AppError(`Book with ID '${id}' not found`, 404);
        }

        return book;
    }

    createBook(data: CreateBookData): Book {
        return this.bookRepository.create(data);
    }

    updateBook(id: string, data: UpdateBookData): Book {

        const existingBook = this.bookRepository.findById(id);

        if (!existingBook) {
            throw new AppError(`Book with ID '${id}' not found`, 404);
        }

        const updatedBook = this.bookRepository.update(id, data);


        if (!updatedBook) {
            throw new AppError('Failed to update book', 500);
        }

        return updatedBook;
    }


    deleteBook(id: string): void {
        const deleted = this.bookRepository.delete(id);

        if (!deleted) {
            throw new AppError(`Book with ID '${id}' not found`, 404);
        }
    }
}
