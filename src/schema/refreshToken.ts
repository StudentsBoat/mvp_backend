import Joi from "joi";

export const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().min(10).required(),
});