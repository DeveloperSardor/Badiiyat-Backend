import { Router } from "express";
import userRouter from './users.js'
import bookRouter from './books.js'
import authorRouter from './authors.js'
import categoryRouter from './category.js'


const router = Router();
router.use('/users', userRouter)
router.use('/books', bookRouter)
router.use('/authors', authorRouter)
router.use('/categories', categoryRouter)


export default router;