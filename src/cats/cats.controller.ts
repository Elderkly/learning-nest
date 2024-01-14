import {
  Controller,
  Get,
  HttpCode,
  Ip,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('all')
  getAllCats(@Ip() ip: string): any {
    console.log(ip);
    return [{ a: 3 }];
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
