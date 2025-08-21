import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { email, password }: any = req.body;
  const { user } = req as any;

  const userId = user?.id;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([{ id: userId, email, password_hash: passwordHash }])
      .select();

    if (userError) return res.status(400).json({ error: userError.message });

    return res.json({
      message: "Signup successful! Please verify your email.",
      user: userData?.[0],
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: err.message || "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { authData } = req as any;
  return res.json({ message: "Login successful", data: authData });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Password reset email sent", data });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Token refreshed", data });
};

// export const currentUser = async (req: Request, res: Response) => {
//   const { user } = req as any; // set by validateTokenMiddleware
//   if (!user) return res.status(401).json({ error: "Unauthorized" });

//   // Optionally fetch profile from users table
//   const { data: profile } = await supabase
//     .from("users")
//     .select("id, email, created_at")
//     .eq("id", user.id)
//     .single();

//   return res.json({ user, profile });
// };

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password is required" });

  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Password updated successfully", data });
};
