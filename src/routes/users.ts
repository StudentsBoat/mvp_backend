import { Router } from "express";
import { register, login, forgotPassword } from "../controllers/users";
import { validateLoginPayload, validateRegisterPayload } from "../middleware/validations/emailPasswordMiddleware";
import { generateUserMiddleware } from "../middleware/auth/generateUser";
import { generateTokenMiddleware } from "../middleware/auth/generateToken";
import { validateTokenMiddleware } from "../middleware/auth/validateToken";

const router = Router();

router.post("/register",validateRegisterPayload, generateUserMiddleware, register);
router.post("/login", validateLoginPayload, generateTokenMiddleware, login);
router.post("/forgot-password", validateTokenMiddleware, forgotPassword);

export default router;
