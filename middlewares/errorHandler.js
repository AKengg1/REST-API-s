export class appError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error, req, res, next) => {
  console.error(`[ERROR] ${error.message}`);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      path: req.url,
    },
  });
};
