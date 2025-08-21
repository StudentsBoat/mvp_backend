import { Router } from "express";
import { resetPassword } from "../controllers/users";
import { validateTokenMiddleware } from "../middleware/auth/validateToken";
import { validateResetPasswordPayload } from "../middleware/validations/emailPasswordMiddleware";

const router = Router();

router.patch("/reset-password", validateTokenMiddleware, validateResetPasswordPayload, resetPassword);

export default router;