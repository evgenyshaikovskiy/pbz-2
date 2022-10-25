import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Employee } from '../model/employee';

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
    const employee: Employee = request.body as unknown as Employee;
    this.appService.addEmployee(employee);
    return request;
  }
}
