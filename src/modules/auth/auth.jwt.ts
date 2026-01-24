import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRETE!;

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};
