import { createConnection } from 'typeorm';

import { Demo } from './entity';
import { setting } from './setting';

const options: any = {
  ...setting,
  entities: [ Demo ],
};

const demo = async () => {

  await createConnection(options);

  const result = await Demo.toFindById(1);

  console.log(result);
};

demo();