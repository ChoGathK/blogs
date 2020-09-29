import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Demo } from './entity';
import { setting } from './setting';
import { DemoService } from './service';
import { DemoController } from './controller';

const options = {
  ...setting,
  entities: [ Demo ],
  autoLoadEntities: true,
};

@Module({
  controllers: [
    DemoController,
  ],
  providers: [
    DemoService,
  ],
  imports: [
    // 启动时创建全局连接池
    TypeOrmModule.forRoot(options),

    // 子模块使用
    // TypeOrmModule.forFeature([
    //   Demo,
    // ]),
  ],
})

export class DemoModule {}
