import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  refreshToken,
} from "../controllers/users";
import {
  validateLoginPayload,
  validateRegisterPayload,
  validateEmailPayload,
  validateRefreshTokenPayload,
} from "../middleware/validations/emailPasswordMiddleware";
import { generateUserMiddleware } from "../middleware/auth/generateUser";
import { generateTokenMiddleware } from "../middleware/auth/generateToken";
import { validateTokenMiddleware } from "../middleware/auth/validateToken";

const router = Router();

router.post(
  "/register",
  validateRegisterPayload,
  generateUserMiddleware,
  register
);
router.post("/login", validateLoginPayload, generateTokenMiddleware, login);
router.post("/forgot-password", validateEmailPayload, forgotPassword);
router.post("/refresh-token", validateRefreshTokenPayload, refreshToken);

export default router;
