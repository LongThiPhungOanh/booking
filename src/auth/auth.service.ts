import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInRequest } from '../user/dto/sign-in.dto';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONTAIN } from '../common/constant';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CustomException } from '../common/exception/custom.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new CustomException('events.USER_EXIST', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return await this.userRepository.save(createUserDto);
  }

  async signIn(signInRequest: SignInRequest) {
    const user = await this.userRepository.findByEmail(signInRequest.email);

    if (!user) {
      throw new CustomException(
        'events.ACCOUNT_NOT_MATCH',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(signInRequest.password, user.password);
    if (!isMatch) {
      throw new CustomException(
        'events.ACCOUNT_NOT_MATCH',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: user.id, username: user.email };
    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload, {
        secret: JWT_CONTAIN.secret,
      }),
    };
  }
}
