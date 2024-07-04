import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column()
    like: number = 0;
}