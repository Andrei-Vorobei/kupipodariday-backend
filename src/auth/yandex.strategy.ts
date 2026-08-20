import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-yandex';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('YANDEX_CLIENT_ID'),
      clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET'),
      callbackURL: configService.get<string>('YANDEX_REDIRECT_URI'),
      scope: ['login:info', 'login:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return await this.authService.validateFromYandex(profile);
  }
}
