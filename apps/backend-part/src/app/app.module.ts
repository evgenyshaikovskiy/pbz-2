import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './controllers/connect.controller';

@Module({
  imports: [DbModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
