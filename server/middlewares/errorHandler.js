export default function(err, req, res, next) {
  if (err.isBoom) {
    const statusCode = err.output.statusCode;
    const data = err.output;

    return res.status(statusCode).json(data);
  }

  return res.json(err);
}
