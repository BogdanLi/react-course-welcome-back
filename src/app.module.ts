import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtensionsController } from './extensions/extensions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extension } from './entities/extensions/extension.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'extensions',
      entities: [Extension],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Extension]),
  ],
  controllers: [AppController, ExtensionsController],
  providers: [AppService],
})
export class AppModule {}
