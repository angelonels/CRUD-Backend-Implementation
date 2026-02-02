# Book Library API

A REST API for managing books built with **Node.js, Express, and TypeScript** using OOP principles (Controller → Service → Repository pattern).

## Features

- CRUD operations (Create, Read, Update, Delete)
- Search by title/author
- Filter by genre
- Sorting (title, year, price)
- Pagination
- Input validation (Zod)
- Centralized error handling

## Tech Stack

- Node.js + Express
- TypeScript
- Zod (validation)
- Helmet (security)

## Project Structure

```
src/
├── controllers/BookController.ts   # Request handlers
├── services/BookService.ts         # Business logic
├── repositories/BookRepository.ts  # Data access (in-memory)
├── models/Book.ts                  # Book interface
├── dtos/bookSchemas.ts             # Validation schemas
├── middlewares/
│   ├── validate.ts                 # Validation middleware
│   └── errorHandler.ts             # Error handler
├── routes/bookRoutes.ts            # API routes
├── utils/AppError.ts               # Custom error class
├── app.ts                          # Express setup
└── server.ts                       # Entry point
```

## Quick Start

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | List all books |
| GET | `/api/books/:id` | Get single book |
| POST | `/api/books` | Create book |
| PATCH | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

### Query Parameters

| Param | Example | Description |
|-------|---------|-------------|
| `search` | `?search=orwell` | Search title/author |
| `genre` | `?genre=fiction` | Filter by genre |
| `sortBy` | `?sortBy=price` | Sort by field |
| `order` | `?order=desc` | Sort direction |
| `page` | `?page=1` | Page number |
| `limit` | `?limit=10` | Items per page |


