import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const authorize = (req, res, next) => {
  let token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json("Not authorized!!!!!!");
  }
  token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.headers.authorization = user;

  next();
};
