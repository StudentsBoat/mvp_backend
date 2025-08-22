import jwt from "jsonwebtoken";

// Make sure to set JWT_SECRET in your .env file
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (email: string, userId: string): string => {
  const token = jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return `Bearer ${token}`;
}