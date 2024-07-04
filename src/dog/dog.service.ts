import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { link } from 'fs';
import { DogEntity } from 'src/models/dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogService {
    constructor(
        @InjectRepository(DogEntity)
        private dogRepository: Repository<DogEntity>
    ) { }

    async pullDogs(): Promise<void> {
        const resolve = await axios.get("https://random.dog/doggos");
        const files = resolve.data;
        const dogs = files.map((el) =>
            this.dogRepository.create({
                link: `https://random.dog/${el}`,
                like: 0,
            }),
        )
        console.log("Получение...")
        await this.dogRepository.save(dogs);
    }

    async getAll() {
        const arrayLink = this.dogRepository.find();
        if (!arrayLink) {
            throw new Error("БД пуста");
        }

        return (await arrayLink).map(el => ({
            id: el.id,
            link: el.link,
            like: el.like
        }));
    }

    async update(id: number) {
        const dog: DogEntity = await this.dogRepository.findOne({ where: { id } });

        if (dog) {
            dog.like++;
            await this.dogRepository.save(dog);
        }
        else {
            throw new Error("Элемент не найден");
        }
    }
}
