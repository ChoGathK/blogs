import { Demo } from './entity';
import { createConnection } from 'typeorm';

const demo = async () => {

  const con = await createConnection({
    type: 'postgres',
    host: 'xxx',
    port: 0,
    username: 'xxx',
    password: 'xxx',
    database: 'xxx',
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