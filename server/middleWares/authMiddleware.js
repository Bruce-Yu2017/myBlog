const auth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized or Session time out, please login again.");
  }
};

export { auth };
