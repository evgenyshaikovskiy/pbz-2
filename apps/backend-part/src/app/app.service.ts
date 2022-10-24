import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getData() {
    const res1 = await this.conn.query(
      'CREATE TABLE IF NOT EXISTS test(id INTEGER, name VARCHAR(20));'
    );
    const res2 = await this.conn.query("INSERT INTO test VALUES(4, 'MIKE');");
    const res = await this.conn.query('SELECT * FROM test');
    return res.rows;
  }
}
