import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../repository/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_CONTAIN } from '../common/constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_CONTAIN.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtService],
})
export class AuthModule {}
