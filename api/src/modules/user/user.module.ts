import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@config/main';
import { UserOrm } from './user.orm';
import { UserResolver } from './controllers/user.graphql';
import { JwtStrategy } from '@core/auth';
import {
  LoginUserInteractor,
  CreateUserInteractor,
  SearchUserInteractor,
} from './uses-cases';
import { UserDatabaseRepository, USER_REPOSITORY } from './user.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrm]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    UserResolver,
    JwtStrategy,
    LoginUserInteractor,
    CreateUserInteractor,
    SearchUserInteractor,
    {
      provide: USER_REPOSITORY,
      useClass: UserDatabaseRepository,
    },
  ],
})
export class UserModule {}
