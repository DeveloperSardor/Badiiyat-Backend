import { Router } from "express";
import { BooksContr } from "../controllers/books.js";
import { checkIsAdmin } from "../middleware/index.js";


const router = Router();

// Get Methods
router.get('/', BooksContr.GetBooks)
router.get('/:id', BooksContr.GetBooks)

// Post Method
router.post('/', checkIsAdmin, BooksContr.AddBook)

// Put Method
router.put('/:id', checkIsAdmin, BooksContr.EditBook)


// Delete Methods
router.delete('/:id', checkIsAdmin, BooksContr.DeleteBook)

export default router;