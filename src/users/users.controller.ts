import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() user: Partial<CreateUserDto>) {
    return this.usersService.updateOne(id, user);
  }

  @Delete(':id')
  removeOne(@Param('id') id: number) {
    return this.usersService.removeOne(id);
  }
}
