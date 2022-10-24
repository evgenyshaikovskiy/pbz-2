import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllCars();
    // eslint-disable-next-line no-debugger
    return res;
  }
}
