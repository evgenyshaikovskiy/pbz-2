import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Employee } from '../model/employee';

@Controller('employees')
export class EmployeeController {
  // TODO: proper answers for some requests
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

  @Delete(':id')
  delete(@Param() params) {
    this.appService.deleteFromRelationById(params.id, 'employees');
  }

  @Get(':id')
  get(@Param() params) {
    const res = this.appService.getByIdFromRelation(params.id, 'employees');
    return res;
  }

  @Put(':id')
  put(@Param() params, @Req() request: Request) {
    const employee: Employee = request.body as unknown as Employee;
    this.appService.updateEmployeeById(params.id, employee);
  }
}
