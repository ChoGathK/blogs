import { Injectable } from '@nestjs/common';

import { Demo } from './entity';

@Injectable()
export class DemoService {

  async find (): Promise<Demo> {
    const result = await Demo.findById(1);
    return result;
  }

  async update (): Promise<void> {
    await Demo.updateById(1, 'test');
  }

}
