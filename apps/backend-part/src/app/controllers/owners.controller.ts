import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Owner } from '../model/owner.model';

@Controller('owners')
export class OwnersController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    // TODO: proper answers for some requests
    const res = this.appService.getAllOwners();
    // eslint-disable-next-line no-debugger
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    const owner: Owner = request.body as unknown as Owner;
    this.appService.addOwner(owner);
    return request;
  }

  @Delete(':id')
  delete(@Param() params) {
    this.appService.deleteFromRelationById(params.id, 'owners');
  }

  @Get(':id')
  get(@Param() params) {
    const res = this.appService.getByIdFromRelation(params.id, 'owners');
    return res;
  }

  @Put(':id')
  put(@Param() params, @Req() request: Request) {
    const owner: Owner = request.body as unknown as Owner;
    this.appService.updateOwnerById(params.id, owner);
  }
}
