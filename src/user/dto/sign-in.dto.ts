import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'password' })
  password: string;
}
