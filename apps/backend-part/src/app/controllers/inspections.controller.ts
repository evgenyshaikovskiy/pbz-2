import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Inspection } from '../model/inspection';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllInspections();
    // eslint-disable-next-line no-debugger
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    const inspection: Inspection = request.body as unknown as Inspection;
    this.appService.addInspection(inspection);
    return request;
  }
}
