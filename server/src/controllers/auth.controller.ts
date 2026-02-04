import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { HTTP_STATUS } from '../constants/http.constants';
import { asyncHandler } from '../utils/asyncHandler';

const authService = new AuthService(new UserRepository());

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(HTTP_STATUS.CREATED).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.status(HTTP_STATUS.OK).json(result);
});

