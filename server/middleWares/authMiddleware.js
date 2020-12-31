const auth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401);
    throw new Error("Session time out or Not authorized, please login again.");
  }
};

export { auth };
