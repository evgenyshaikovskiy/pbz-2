import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {
    this.load();
  }

  public async getAllEmployees() {
    const query = await this.connection.query('SELECT * FROM employees;');
    return query;
  }

  public async getAllInspections() {
    const query = await this.connection.query('SELECT * FROM inspections;');
    return query;
  }

  public async getAllOwners() {
    const query = await this.connection.query('SELECT * FROM owners;');
    return query;
  }

  public async getAllCars() {
    const query = await this.connection.query('SELECT * FROM cars;');
    return query;
  }
  public async addEmployee(employee) {
    const query = await this.connection.query(``);
    return query;
  }

  private async load() {
    try {
      const query = await this.connection.query(
        `CREATE TABLE IF NOT EXISTS owners(
          id SERIAL PRIMARY KEY, full_name VARCHAR(80),
          driving_license_number VARCHAR(10), address VARCHAR(20),
          year_of_birth VARCHAR(4), sex VARCHAR(1));

        CREATE TABLE IF NOT EXISTS cars(
          id SERIAL PRIMARY KEY, plate_number VARCHAR(10),
          engine_number VARCHAR(10), color VARCHAR(30),
          brand VARCHAR(30),
          owner_id INTEGER REFERENCES owners(id));

        CREATE TABLE IF NOT EXISTS employees(id SERIAL PRIMARY KEY, full_name VARCHAR(80), position VARCHAR(30));

        CREATE TABLE IF NOT EXISTS inspections(
          car_id INTEGER REFERENCES cars(id),
          employee_id INTEGER REFERENCES employees(id),
          inspection_result VARCHAR(20)
        );
        `
      );

      return query;
    } catch (error) {
      console.log(error.message);
    }
  }
}
