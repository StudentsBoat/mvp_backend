import { Router } from "express";
import { register, login, forgotPassword } from "../../controllers/users";
import { validateLoginPayload, validateRegisterPayload } from "../../middleware/validations/emailPasswordMiddleware";
import { validateTokenMiddleware } from "../../middleware/auth/validateToken";

const router = Router();

router.post("/register",validateRegisterPayload, register);
router.post("/login", validateLoginPayload, login);
router.post("/forgot-password", validateTokenMiddleware, forgotPassword);

export default router;
