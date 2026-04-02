import { appError } from "./errorHandler.js";

export const validateFields = (fields) => {
  return (req, res, next) => {
    const missing = fields.filter((e) => !req.body[e]);
    if (missing.length > 0)
      return next(
        new appError(400,`Missing required fields: ${missing.join(", ")}`),
      );

    next();
  };
};
