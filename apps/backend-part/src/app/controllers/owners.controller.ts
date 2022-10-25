import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Owner } from '../model/owner.model';

@Controller('owners')
export class OwnersController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll(@Req() request: Request) {
    const res = this.appService.getAllOwners();
    // eslint-disable-next-line no-debugger
    console.log(request);
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    const owner: Owner = request.body as unknown as Owner;
    this.appService.addOwner(owner);
    return request;
  }
}
