import { IUser, UserModel } from '../models/User.model';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }
}