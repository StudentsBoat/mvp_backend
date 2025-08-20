import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Sign up user with Supabase Auth
  const { data: authData, error: authError }: any = await supabase.auth.signUp({ email, password });
  const data: any = await supabase.auth.signUp({ email, password });

  if (authError) return res.status(400).json({ error: authError.message });

  // Save user data into users table
  const user = authData?.user || authData.user?.user_metadata || authData.session?.user;
  const userId = user?.id || user?.sub || authData?.data.session?.user?.id;

  // You can add more fields as needed
  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ id: userId, email, password_hash: authData?.session?.access_token || password }])
    .select();

  if (userError) return res.status(400).json({ error: userError.message });

  return res.json({
    message: "Signup successful! Please verify your email.",
    user: userData?.[0],
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Login successful", data });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Password reset email sent", data });
};