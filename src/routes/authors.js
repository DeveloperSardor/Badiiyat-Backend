import { Router } from "express";
import { AuthorContr } from "../controllers/author.js";
import { checkIsAdmin } from "../middleware/index.js";


const router = Router();

// Get Methods
router.get('/', AuthorContr.GetAuthors)
router.get('/:id', AuthorContr.GetAuthors)

// Post Method
router.post('/', checkIsAdmin, AuthorContr.AddAuthor)

// Put Method
router.put('/:id', checkIsAdmin, AuthorContr.EditAuthor)

// Delete Method
router.delete('/:id', checkIsAdmin, AuthorContr.DeleteAuthor)


export default router;