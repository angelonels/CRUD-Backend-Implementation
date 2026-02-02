

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    year: number;
    price: number;
    createdAt: Date;
}


export type CreateBookData = Omit<Book, 'id' | 'createdAt'>;


export type UpdateBookData = Partial<CreateBookData>;
