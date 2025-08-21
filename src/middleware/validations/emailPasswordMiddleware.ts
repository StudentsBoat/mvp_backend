import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { loginSchema } from "../../schema/login";
import { emailSchema } from "../../schema/email";
import { refreshTokenSchema } from "../../schema/refreshToken";
import { resetPasswordSchema } from "../../schema/resetPassword";

export function validateRegisterPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export function validateLoginPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export function validateEmailPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = emailSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export function validateRefreshTokenPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export function validateResetPasswordPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}
