import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

export const register = async (req: Request, res: Response) => {
  const { email, password }: any  = req.body;
  const { user } = req as any;

  const userId = user?.id;

  // You can add more fields as needed
  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ id: userId, email, password_hash: password }])
    .select();

  if (userError) return res.status(400).json({ error: userError.message });

  return res.json({
    message: "Signup successful! Please verify your email.",
    user: userData?.[0],
  });
};

export const login = async (req: Request, res: Response) => {
  const { authData } = req as any;
  return res.json({ message: "Login successful", data: authData });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { user } = req as any;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Password reset email sent", data });
};