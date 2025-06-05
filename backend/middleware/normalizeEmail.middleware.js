export const normalizeEmail = (req, res, next) => {
  if (req.body?.email) {
    req.body.email = req.body.email.toLowerCase().trim();
  }
  next();
};
