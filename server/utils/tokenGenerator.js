import jwt from 'jsonwebtoken';

const generateJWT = email => jwt.sign(
  {
    email,
    confirmed: false,
  },
  process.env.JWT_SECRET,
);

export default generateJWT;
