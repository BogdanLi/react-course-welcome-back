import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExtensionDto } from 'src/dto/extensions/create-extension.dto';
import { Extension } from 'src/entities/extensions/extension.entity';
import { Repository } from 'typeorm';

@Controller('extensions')
export class ExtensionsController {
  constructor(
    @InjectRepository(Extension)
    private repository: Repository<Extension>,
  ) {}

  @Get()
  async getAll(@Query('lang') lang) {
    // const language = lang === 'ru' ? 'description_ru' : 'description_en';

    // return await this.repository.find({
    //   select: ['id', 'name', language, 'link'],
    // });

    const languageMap = {
      ru: 'description_ru',
      en: 'description_en',
    };

    const selectedLanguage = languageMap[lang]; // Use language map for clarity

    if (!selectedLanguage) {
      return {
        message: 'Could not find this language',
      };
    }

    const queryBuilder = this.repository.createQueryBuilder('entity'); // Alias for clarity

    queryBuilder.select([
      'id',
      'name',
      `SUBSTRING(${selectedLanguage}, 1, LENGTH(${selectedLanguage})) AS description`,
      'link',
    ]);

    return await queryBuilder.getRawMany<{ description: string }>();
  }

  @Get('/admin')
  async getAllAdmin() {
    return await this.repository.find();
  }

  @Get(':id')
  async getById(@Param('id') id) {
    return await this.repository.findOne({ where: { id: id } });
  }

  @Post()
  async addExtension(@Body() body: CreateExtensionDto) {
    return await this.repository.save({
      ...body,
    });
  }

  @Patch(':id')
  async updateExtension(@Param('id') id, @Body() body) {
    const extension = await this.repository.findOne({ where: { id: id } });

    return await this.repository.save({
      ...extension,
      ...body,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteExtension(@Param('id') id) {
    const extension = await this.repository.findOne({ where: { id: id } });

    await this.repository.remove(extension);
  }
}
