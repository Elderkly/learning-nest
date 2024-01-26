import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  ParseIntPipe,
  Query,
  Redirect,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { HttpExceptionFilter } from 'src/filtter/http-exception.filtter';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('cats')
export class CatsController {
  constructor(private catsServices: CatsService) {}

  @Get('test')
  @UseFilters(HttpExceptionFilter)
  test() {
    throw new HttpException('123123', HttpStatus.BAD_GATEWAY);
    return '123';
  }

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
  @UseGuards(AuthGuard)
  @Get(':id')
  getCatsById(@Param('id', ParseIntPipe) id: string): string {
    console.log(id, typeof id);
    return `Find ${id} values`;
  }
}
