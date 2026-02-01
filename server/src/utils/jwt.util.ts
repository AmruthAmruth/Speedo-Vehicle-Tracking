import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  });
};