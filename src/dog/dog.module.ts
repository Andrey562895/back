import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from 'src/models/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService],
})
export class DogModule { }
