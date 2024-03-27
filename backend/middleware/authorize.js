import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const authorize = (req, res, next) => {
  if (!req.headers.authorization.split("Bearer ")[1]) {
    return res.status(400).json("Not authorized!!!!!!");
  }

  const token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.headers.authorization = user;

  next();
};
