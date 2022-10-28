import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './controllers/cars.controller';
import { EmployeeController } from './controllers/employees.controller';
import { InspectionsController } from './controllers/inspections.controller';
import { OwnersController } from './controllers/owners.controller';
import { SearchController } from './controllers/search.controller';

@Module({
  imports: [DbModule],
  controllers: [
    AppController,
    OwnersController,
    EmployeeController,
    CarsController,
    InspectionsController,
    SearchController,
  ],
  providers: [AppService],
})
export class AppModule {}
