import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { HTTP_STATUS } from '../constants/http.constants';

const authService = new AuthService(new UserRepository());

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(HTTP_STATUS.CREATED).json(user);
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error: any) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: error.message });
  }
};
