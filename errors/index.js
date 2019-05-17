exports.handle400 = (err, req, res, next) => {
  // err = {err: '404: etc'}
  const codes = {
    "22P02": "invalid input, integers expected"
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: err.msg || "Not found" });
  else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Endpoint not found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle422 = (err, req, res, next) => {
  console.log(err);
  const codes = {
    "23503": "user does not exist"
  };
  if (codes[err.code]) res.status(422).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error hihi" });
};
