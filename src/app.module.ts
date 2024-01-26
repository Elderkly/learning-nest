import {
  Dependencies,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { Photo } from './photos/photos.entity';
import { PhotosModule } from './photos/photos.module';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      // entities: [User, Photo],
      autoLoadEntities: true, //每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中。
      synchronize: true, //  自动创建表
    }),
    CatsModule,
    UsersModule,
    PhotosModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {
  constructor(dataSource: any) {
    //  @ts-ignore
    this.dataSource = dataSource;
  }
}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .exclude({ path: 'cats/baidu', method: RequestMethod.ALL })
//       .forRoutes('cats');
//   }
// }
