

import { Router } from 'express';
import { BookController } from '../controllers/BookController';
import { validate } from '../middlewares/validate';
import { createBookSchema, updateBookSchema } from '../dtos/bookSchemas';

const router = Router();
const bookController = new BookController();


router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getBookById);

router.post('/', validate(createBookSchema), bookController.createBook);

router.patch('/:id', validate(updateBookSchema), bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

export default router;
