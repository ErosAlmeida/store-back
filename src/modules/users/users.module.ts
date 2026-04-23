import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from '../../common/users/users.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
