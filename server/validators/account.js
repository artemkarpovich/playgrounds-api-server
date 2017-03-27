import Joi from 'joi';

export const signinValidateSchema = {
  body: {
    email: Joi.string().min(6).max(60).email().required(),
    password: Joi.string().min(6).max(60).required()
  }
};
