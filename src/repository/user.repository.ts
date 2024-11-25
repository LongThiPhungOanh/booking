import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(createUserDto: CreateUserDto) {
    await this.prismaService.user.create({
      data: {
        full_name: createUserDto.fullName,
        email: createUserDto.email,
        phone: createUserDto.phone,
        address: createUserDto.address,
        enable: 'Y',
        role: 'User',
        password: createUserDto.password,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      where: {
        role: 'User',
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        address: true,
        enable: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email: email, enable: 'Y', role: 'User' },
    });
  }
}
