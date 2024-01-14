import { Controller, Get, HostParam } from '@nestjs/common';

//  host: 限制客户端请求域名
// @Controller({ host: 'localhost', path: 'admin' })
@Controller({ host: ':host', path: 'admin' })
export class AdminController {
  @Get()
  getAllData(@HostParam('host') host: string) {
    console.log(host);
    if (host === 'localhost') return 'From admin controller';
    else throw new Error('-Invalid');
  }
}
