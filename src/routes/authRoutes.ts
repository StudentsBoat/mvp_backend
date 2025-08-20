import { Router } from "express";
import { register, login, forgotPassword } from "../controllers/authController";
import { validateLoginPayload, validateRegisterPayload } from "../middleware/validations/emailPasswordMiddleware";

const router = Router();

router.post("/register",validateRegisterPayload, register);
router.post("/login", validateLoginPayload, login);
router.post("/forgot-password", forgotPassword);

export default router;
