import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Profile } from 'passport-yandex';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

type PublicUser = Omit<User, 'password' | 'yandexId'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  auth(id: number | string): { access_token: string } {
    return {
      access_token: this.jwtService.sign({
        sub: id,
      }),
    };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<PublicUser> {
    const user = await this.usersService.findUserByFilter({ username });

    if (!user || !user.password) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: unusedPassword, yandexId, ...publicUser } = user;

    return publicUser;
  }

  async validateFromYandex(profile: Profile): Promise<PublicUser> {
    let user = await this.usersService.findByYandexID(profile.id);

    if (!user) {
      user = await this.usersService.createFromYandex(profile);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, yandexId, ...publicUser } = user;

    return publicUser;
  }
}
