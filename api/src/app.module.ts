import { Module } from '@nestjs/common';
import { MercuriusModule } from 'nestjs-mercurius';
import { typeormConfig } from '@config/orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from '@modules/cat/cat.module';
import { UserModule } from '@modules/user/user.module';
import { HeroModule } from '@modules/hero/hero.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    // Work also with async configuration (MercuriusModule.forRootAsync)
    MercuriusModule.forRoot({
      graphiql: 'playground',
      autoSchemaFile: true,
      // context: (request, reply) => ({
      //   user: request.user,
      // }),
      subscription: {
        // context: (connection, request) => ({
        //   user: request.user,
        // }),
      },
    }),
    CatsModule,
    UserModule,
    HeroModule,
  ],
  providers: [],
})
export class AppModule {}
