import { Module } from '@nestjs/common';
import { DogModule } from './dog/dog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DogEntity } from './models/dog.entity';

@Module({
  imports: [
    DogModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configSevice: ConfigService) => ({
        type: 'postgres',
        host: configSevice.get("DB_HOST"),
        port: configSevice.get("DB_PORT"),
        username: configSevice.get("DB_USERNAME"),
        password: configSevice.get("DB_PASSWORD"),
        database: configSevice.get("DB_NAME"),
        entities: [DogEntity],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
