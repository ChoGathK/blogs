import { Injectable } from '@nestjs/common';

import { Demo } from './entity';

@Injectable()
export class DemoService {

  async find (): Promise<Demo> {
    const result = await Demo.toFindById(1);
    return result;
  }

  async update (): Promise<void> {
    await Demo.toChange({ id: 1 }, { detail: 'update' + Date.now() });
  }

}
