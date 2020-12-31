const errorHandler = (err, req, res, next) => {
  console.log("err: ", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    detail: err.detail,
  });
};

export { errorHandler };
