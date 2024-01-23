import {
  Controller,
  Get,
  HttpCode,
  Ip,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsServices: CatsService) {}
  @Get('all')
  async getAllCats(@Ip() ip: string): Promise<Cat[]> {
    console.log(ip);
    return this.catsServices.findAll();
  }

  @Get('ab*cd')
  @HttpCode(204)
  matchSpeclialPath() {
    return 'math success';
  }

  @Get('baidu')
  @Redirect('https://baidu.com')
  redirectToBaidu(@Query('block') block: boolean) {
    return { url: `https://baidu.com?params=block:${block}` };
  }

  // @Get(':id')
  // getCatsById(@Param() params: { [K: string]: string }): string {
  //   return `Find ${params.id} values`;
  // }
  @Get(':id')
  getCatsById(@Param('id') id: string): string {
    return `Find ${id} values`;
  }
}
