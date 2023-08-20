import { Router } from "express";
import { CategoryContr } from "../controllers/category.js";
import { checkIsAdmin } from "../middleware/index.js";


const router = Router();

// Get methods
// router.get('/author-cat', CategoryContr.GetAuthorCategories)
// router.get('/books-cat', CategoryContr.GetAuthorCategories)
router.get('/', CategoryContr.GetCategories)

// Post methods
router.post('/', checkIsAdmin, CategoryContr.AddCategory)

// Put Methods
router.put('/:id', checkIsAdmin, CategoryContr.EditCategory)

// Delete Methods
router.delete('/:id', checkIsAdmin, CategoryContr.DeleteCategory)

export default router;