import { IUser, UserModel } from '../models/User.model';
import { IUserRepository } from '../interfaces/IUserRepository';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }
}