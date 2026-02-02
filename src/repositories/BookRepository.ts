

import { Book, CreateBookData, UpdateBookData } from '../models/Book';
import { IBookRepository, QueryOptions, PaginatedResult } from './interfaces/IBookRepository';

export class BookRepository implements IBookRepository {

    private books: Book[] = [];

    private idCounter: number = 1;

    private generateId(): string {
        return `book_${this.idCounter++}`;
    }

    findAll(options: QueryOptions = {}): PaginatedResult<Book> {
        let result = [...this.books];

        if (options.search) {
            const searchTerm = options.search.toLowerCase();
            result = result.filter(
                book =>
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.author.toLowerCase().includes(searchTerm)
            );
        }

        if (options.genre) {
            result = result.filter(
                book => book.genre.toLowerCase() === options.genre!.toLowerCase()
            );
        }

        if (options.sortBy) {
            const sortOrder = options.order === 'desc' ? -1 : 1;
            result.sort((a, b) => {
                if (a[options.sortBy!] < b[options.sortBy!]) return -1 * sortOrder;
                if (a[options.sortBy!] > b[options.sortBy!]) return 1 * sortOrder;
                return 0;
            });
        }

        const total = result.length;
        const page = options.page || 1;
        const limit = options.limit || 10;
        const totalPages = Math.ceil(total / limit);

        const startIndex = (page - 1) * limit;
        const paginatedData = result.slice(startIndex, startIndex + limit);

        return {
            data: paginatedData,
            total,
            page,
            limit,
            totalPages
        };
    }

    findById(id: string): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    create(data: CreateBookData): Book {
        const newBook: Book = {
            id: this.generateId(),
            ...data,
            createdAt: new Date()
        };
        this.books.push(newBook);
        return newBook;
    }

    update(id: string, data: UpdateBookData): Book | undefined {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            return undefined;
        }

        this.books[index] = {
            ...this.books[index],
            ...data
        };

        return this.books[index];
    }

    delete(id: string): boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            return false;
        }

        this.books.splice(index, 1);
        return true;
    }
}
