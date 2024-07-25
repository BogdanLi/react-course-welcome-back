import { Length } from 'class-validator';

export class CreateExtensionDto {
  @Length(3, 255)
  name: string;

  @Length(3, 255)
  description_ru: string;
  @Length(3, 255)
  description_en: string;

  @Length(3, 255)
  link: string;
}
