import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

export const generateInvalidToken = (payload) => {
  try {
    return jwt.sign(payload, 'wrong_secret');
  } catch {
    return null;
  }
};
