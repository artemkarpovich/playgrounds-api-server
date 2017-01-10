// import Boom from 'boom';

export default function(err, req, res, next) {
  console.log(err, 'errr---');
  if (err.isBoom) {
    const statusCode = err.output.statusCode;
    const data = err.output;

    return res.status(statusCode).json(data);
  }

  return res.json(err);
}
