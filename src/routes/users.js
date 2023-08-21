import { Router } from "express";
import { UserContr } from "../controllers/user.js";
import { checkToken } from "../middleware/index.js";

const router = Router();

// Authorization
router.post('/register', UserContr.Register)
router.post('/login', UserContr.Login)

// Get Method
router.get('/profile', checkToken, UserContr.GetMyProfile)

// Put Method
router.put('/profile', checkToken, UserContr.EditMyProfile)
router.put('/security', checkToken, UserContr.EditSecurity)


export default router;