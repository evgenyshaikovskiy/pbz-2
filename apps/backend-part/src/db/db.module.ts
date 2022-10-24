import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { Pool } from 'pg';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'yauheni',
    host: 'localhost',
    database: 'pbz_2_db',
    password: 'password123',
    port: '5432',
  }),
};
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
