import { Request, Response, NextFunction } from "express";
import { supabase } from "../../config/supabaseClient";

export const generateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  (req as any).user = data.user;
  next();
};
