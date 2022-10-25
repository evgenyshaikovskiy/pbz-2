import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Car } from '../model/car.model';

@Controller('cars')
export class CarsController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllCars();
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    console.log(request.body);
    const car: Car = request.body as unknown as Car;

    console.log(car);
  }
}
