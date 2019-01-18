import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch {
    return null;
  }
};

export const generateInvalidToken = (payload) => {
  try {
    const token = jwt.sign(payload, 'wrongsecret');
    return token;
  } catch {
    return null;
  }
};
