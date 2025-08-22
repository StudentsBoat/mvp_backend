import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Make sure to set JWT_SECRET in your .env file
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};