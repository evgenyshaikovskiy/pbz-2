import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllInspections();
    // eslint-disable-next-line no-debugger
    return res;
  }
}