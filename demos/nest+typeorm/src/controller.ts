/**
 * @name: < 路由与控制转发 >
 * @author: chogath
 */

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Demo } from './entity';
import { DemoService } from './service';

@Controller()
export class DemoController {

  constructor(private readonly demo: DemoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async find(): Promise<Demo> {
   const result = await this.demo.find();
   return result;
  }

  @Get('update')
  @HttpCode(HttpStatus.OK)
  async update(): Promise<void> {
   await this.demo.update();
  }

}