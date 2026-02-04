import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../utils/jwt.util';
import { comparePassword, hashPassword } from '../utils/password.util';
import { HTTP_MESSAGES } from '../constants/http.constants';

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}


interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private _userRepository: UserRepository) { }

  async register(data: RegisterDTO) {
    const existingUser = await this._userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error(HTTP_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this._userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email
    };
  }



  async login(data: LoginDTO) {

    const user = await this._userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error(HTTP_MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD);
    }


    const isPasswordValid = await comparePassword(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error(HTTP_MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD);
    }


    const token = generateToken({
      userId: user._id.toString(),
      email: user.email
    });


    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };
  }


}
