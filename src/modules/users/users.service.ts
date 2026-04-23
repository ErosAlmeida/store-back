import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service';
import { UserResponseDto } from './users.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
  
  async findOne(id: string): Promise<UserResponseDto> {
      const user = await this.prisma.findUnique({
        where: { id },
      })
    
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToInstance(UserResponseDto, user)
  }
}