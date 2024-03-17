export const authorize = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split("Bearer ")[1];
  }

  console.log(token);
};
