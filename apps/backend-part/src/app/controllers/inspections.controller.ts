import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Inspection } from '../model/inspection';

@Controller('inspections')
export class InspectionsController {
  // TODO: proper answers for some requests
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

  @Delete(':id')
  delete(@Param() params) {
    this.appService.deleteFromRelationById(params.id, 'inspections');
  }

  @Get(':id')
  get(@Param() params) {
    const res = this.appService.getByIdFromRelation(params.id, 'inspections');
    return res;
  }

  @Put(':id')
  put(@Param() params, @Req() request: Request) {
    const inspection: Inspection = request.body as unknown as Inspection;
    this.appService.updateInspectionById(params.id, inspection);
  }
}
