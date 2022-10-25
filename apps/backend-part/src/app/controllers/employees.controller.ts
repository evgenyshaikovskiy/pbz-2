import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllEmployees();
    // eslint-disable-next-line no-debugger
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    console.log(request.body);
  }
}
