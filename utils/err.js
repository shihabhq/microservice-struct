const error = (msg = "something went wrong", status = 500) => {
  const e = new Error(msg);
  e.status = status;
  return e;
};

const errorHandler = (err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "server error occured" });
};

export { error };
export default errorHandler;
