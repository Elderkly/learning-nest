import { Controller, Get } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('test')
  async test() {
    const user1 = Object.assign(new User(), {
      firstName: '123',
      lastName: '456',
    });
    const user2 = Object.assign(new User(), {
      firstName: 'bbbb',
      lastName: '2222',
    });
    return await this.usersService.createMany([user1, user2]);
  }
}
