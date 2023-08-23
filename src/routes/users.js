import { Router } from "express";
import { UserContr } from "../controllers/user.js";
import { checkToken, checkIsAdmin } from "../middleware/index.js";

const router = Router();

// Authorization
router.post('/register', UserContr.Register)
router.post('/login', UserContr.Login)
router.post('/login-admin', UserContr.LoginAdmin)

// Get Method
router.get('/profile', checkToken, UserContr.GetMyProfile)
router.get('/view-users', checkIsAdmin, UserContr.GetUsersForAdmin)

// Put Method
router.put('/profile', checkToken, UserContr.EditMyProfile)
router.put('/security', checkToken, UserContr.EditSecurity)


export default router;
