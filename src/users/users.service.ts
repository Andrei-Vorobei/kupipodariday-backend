import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  updateOne(id: number, user: Partial<CreateUserDto>): Promise<UpdateResult> {
    return this.userRepository.update({ id }, user);
  }

  removeOne(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
