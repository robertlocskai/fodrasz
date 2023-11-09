import Joi from 'joi';
import { tlds } from '@hapi/tlds';

const signup = Joi.object({
  firstname: Joi.string().min(5).max(20).required(),
  lastname: Joi.string().min(5).max(20).required(),

  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),

  password: Joi.string().min(5).max(32).required(),

  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password')
});

// login
const login = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
  password: Joi.string().min(5).max(32).required()
});

export { signup, login };
