import { appError } from "./errorHandler";

export const validateFields = (fields) => {
  return (req, res, next) => {
    const missing = fields.filter((e) => !req.body[e]);
    if (missing.length > 0)
      return next(
        new appError(`Missing required fields: ${missing.join(", ")}`, 400),
      );

    next();
  };
};
