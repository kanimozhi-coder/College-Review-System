import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("student", "teacher", "admin"),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    next();
  };
};

export default {
  validateRegister: validateRequest(registerSchema),
  validateLogin: validateRequest(loginSchema),
};
