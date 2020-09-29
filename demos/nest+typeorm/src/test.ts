import { createConnection } from 'typeorm';

import { Demo } from './entity';
import { setting } from './setting';

const options: any = {
  ...setting,
  entities: [ Demo ],
};

const demo = async () => {

  await createConnection(options);

  const result1 = await Demo.toFindById(2);

  const result2 = await Demo.toFindOne({ where: { id: 1 } });

  const list = await Demo.toFindAll();

  console.log(result1, result2, list);

  await Demo.toChange({ id: 1 }, { detail: 'update in 2020'});

  await Demo.toSoftRemove({ id: 2 });

  console.log('=====================');

  await Demo.toCreate({ detail: '3'});

  await Demo.toCreateAll([
    { detail: '4' },
    { detail: '5' },
  ]);

  const list2 = await Demo.toFindAll();

  console.log(list2);

  console.log('=====================');

};

demo();