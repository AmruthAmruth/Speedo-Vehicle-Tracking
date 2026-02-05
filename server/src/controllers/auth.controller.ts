import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { HTTP_STATUS } from '../shared/constants/http.constants';
import { asyncHandler } from '../shared/utils/asyncHandler';
import { injectable, inject } from 'tsyringe';

@injectable()
export class AuthController {
  constructor(@inject('IAuthService') private authService: IAuthService) { }

  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);
    res.status(HTTP_STATUS.CREATED).json(user);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);
    res.status(HTTP_STATUS.OK).json(result);
  });
}
