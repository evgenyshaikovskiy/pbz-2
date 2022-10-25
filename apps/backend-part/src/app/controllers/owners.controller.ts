import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('owners')
export class OwnersController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAll() {
    const res = this.appService.getAllOwners();
    // eslint-disable-next-line no-debugger
    return res;
  }

  @Post()
  create(@Req() request: Request) {
    console.log(request.body);
  }
}
