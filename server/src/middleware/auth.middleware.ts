import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}



import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}


export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Read Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authorization token missing'
      });
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // 4. Attach user to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    // 5. Continue request
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};
