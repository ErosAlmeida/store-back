import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { UsersService } from '../../common/users/users.service';
import { UserResponseDto } from './users.dto';



@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ type: UserResponseDto })
  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id)
  }
}