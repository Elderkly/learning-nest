import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('/all')
  getAllCats(): any {
    return [{ a: 2 }];
  }
}
