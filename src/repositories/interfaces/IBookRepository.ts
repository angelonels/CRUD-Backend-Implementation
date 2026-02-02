

import { Book, CreateBookData, UpdateBookData } from '../../models/Book';


export interface QueryOptions {
    search?: string;      
    genre?: string;       
    sortBy?: 'title' | 'year' | 'price';  
    order?: 'asc' | 'desc';               
    page?: number;       
    limit?: number;    
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IBookRepository {
    findAll(options?: QueryOptions): PaginatedResult<Book>;
    findById(id: string): Book | undefined;
    create(data: CreateBookData): Book;
    update(id: string, data: UpdateBookData): Book | undefined;
    delete(id: string): boolean;
}
