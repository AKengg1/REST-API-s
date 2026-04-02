export class appError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHnadler = (error, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  const code = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).join({
    error: {
      message,
      status: statusCode,
      path: req.url,
    },
  });
};
