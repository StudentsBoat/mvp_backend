import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
});