import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../../schema/login";

export function validateRegisterPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export function validateLoginPayload(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    console.log("Validating login payload:", req.body, error);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}