import Joi from 'joi';
import { tlds } from '@hapi/tlds';

// signup schema
const signup = Joi.object({
  firstname: Joi.string().min(5).max(20).required(),
  lastname: Joi.string().min(5).max(20).required(),

  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),

  password: Joi.string().min(5).max(32).required(),

  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password')
});

// login schema
const login = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
  password: Joi.string().min(5).max(32).required()
});

export { signup, login };
