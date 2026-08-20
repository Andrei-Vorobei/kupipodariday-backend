import { Inject, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Offer } from './offers/entities/offer.entity';
import { APP_FILTER } from '@nestjs/core';
import { ServerExceptionFilter } from './filter/server-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
          format: winston.format.json(),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [User, Wish, Wishlist, Offer],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: ServerExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    logger.log('info', 'AppModule запущен.');
  }
}
