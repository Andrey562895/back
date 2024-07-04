import { Controller, Get, Param, Post } from '@nestjs/common';
import { DogService } from './dog.service';

@Controller('dogs')
export class DogController {
  constructor(private readonly dogService: DogService) { }

  @Get("pull")
  async pullAll() {
    return this.dogService.pullDogs();
  }

  @Get()
  async getAll() {
    return this.dogService.getAll();
  }

  @Post(":id")
  async update(@Param("id") id: number) {
    return this.dogService.update(id);
  }
}
