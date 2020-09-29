import { Demo } from './entity';
import { createConnection } from 'typeorm';

const demo = async () => {

  const con = await createConnection({
    type: 'postgres',
    host: 'rm-2ze31xxs616i5dz6tto.pg.rds.aliyuncs.com',
    port: 3432,
    username: 'bobbyen',
    password: 'cru1dKAaS9gOLtuo',
    database: 'dev_global_application',
    entities: [ Demo ],
    // synchronize: true,
  });

  const demo = con.getRepository(Demo);

  // demo.insert({ detail: 'test' });
  await Demo.updateDemoById(1, 'update-test');

  const result = await Demo.findDemoById(1);

  console.log(result);
};

demo();