import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { useParams } from 'react-router-dom';
import { AppService } from '../app.service';
import { Car } from '../model/car.model';

@Controller('cars')
export class CarsController {
  // TODO: proper answers for some requests
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllCars();
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    const car: Car = request.body as unknown as Car;
    this.appService.addCar(car);
    return request;
  }

  @Delete(':id')
  delete(@Param() params) {
    this.appService.deleteFromRelationById(params.id, 'cars');
  }

  @Get(':id')
  get(@Param() params) {
    const res = this.appService.getByIdFromRelation(params.id, 'cars');
    return res;
  }

  @Put(':id')
  put(@Param() params, @Req() request: Request) {
    const car: Car = request.body as unknown as Car;
    this.appService.updateCarById(params.id, car);
  }
}
