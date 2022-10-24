import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const res = this.appService.getData();
    res.then((val) => {
      console.log(val);
    });
  }
}
