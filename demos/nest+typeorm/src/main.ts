/**
 * @name: < 启动目录 >
 * @author: chogath
 */

import { DemoModule } from './module';
import { NestFactory } from '@nestjs/core';

const main = async () => {
  const app = await NestFactory.create(DemoModule, { cors: true });
  await app.listen(3000);
};

main();