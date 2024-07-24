import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Extension {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description_ru: string;
  @Column()
  description_en: string;

  @Column()
  link: string;
}
