import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('search')
export class SearchController {
  constructor(private readonly appService: AppService) {}
  @Post('/cars')
  getCars(@Req() request: Request) {
    return this.appService.getCarsBetweenDates(
      request.body['begin_date'],
      request.body['end_date']
    );
  }

  @Post('/employees')
  getEmployees(@Req() request: Request) {
    return this.appService.getEmployeesByDate(request.body['date']);
  }
}
