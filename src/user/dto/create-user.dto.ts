import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'address' })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'fullName' })
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'phone' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'password' })
  password: string;
}
