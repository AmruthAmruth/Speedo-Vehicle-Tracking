import { IUser } from '../models/User.model';

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    create(user: Partial<IUser>): Promise<IUser>;
}
