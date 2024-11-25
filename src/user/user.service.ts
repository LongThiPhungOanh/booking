import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }
}
