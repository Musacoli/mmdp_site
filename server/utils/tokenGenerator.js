import jwt from "jsonwebtoken";

const generateJWT = email => {
  return jwt.sign(
    {
      email: email,
      confirmed: false
    },
    process.env.JWT_SECRET
  );
};

export default generateJWT;
