import { Request, Response } from "express";
import { createSignUpUser, findUserByEmail } from "../models/user";
import { comparePassword, hashPassword } from "../services/bcrypt";
import { generateToken } from "../middleware/auth/generateToken";

export const register = async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  try {
    // Check if user already exists
    const existingUser = await  await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await createSignUpUser(email, passwordHash);

    return res.json({
      message: "Signup successful! Please verify your email.",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  try {
    // Find user by email
    const user: any = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = await generateToken(email, user.id);

    return res.json({ message: "Login successful", user: { userId: user.id, email: user.email, token} });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { user } = req as any;
    // Implement your password reset logic here (e.g., send email with reset link)
    return res.json({ message: "Password reset functionality not implemented.", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};