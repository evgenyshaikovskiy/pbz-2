import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { Car } from './model/car.model';
import { Employee } from './model/employee';
import { Inspection } from './model/inspection';
import { Owner } from './model/owner.model';
@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {
    this.load();
  }

  // get all functions
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

  // add functions
  public async addEmployee(employee: Employee) {
    const query = await this.connection.query(`
      INSERT INTO employees(full_name, position) VALUES('${employee.full_name}', '${employee.position}')`);
    return query;
  }

  public async addOwner(owner: Owner) {
    const query = await this.connection.query(`
      INSERT INTO owners(full_name, driving_license_number, address, year_of_birth, sex)
        VALUES('${owner.full_name}', '${owner.driving_license_number}', '${owner.address}', '${owner.year_of_birth}', '${owner.sex}');`);

    return query;
  }

  public async addCar(car: Car) {
    const query = await this.connection.query(`
      INSERT INTO cars(plate_number, engine_number, color, brand, owner_id)
        VALUES('${car.plate_number}', '${car.engine_number}', '${car.color}', '${car.brand}',
          (SELECT id FROM owners WHERE owners.full_name = '${car.owner_full_name}'));
    `);

    return query;
  }

  public async addInspection(inspection: Inspection) {
    const query = await this.connection.query(`
      INSERT INTO inspections(car_id, employee_id, inspection_result) VALUES(
        (SELECT id FROM cars WHERE cars.plate_number = '${inspection.car_plate_number}'),
        (SELECT id FROM employees WHERE employees.full_name = '${inspection.employee_full_name}')
      );`);
    return query;
  }

  // delete functions
  public async deleteFromRelationById(id: number, relationName: string) {
    const query = await this.connection.query(
      `DELETE FROM ${relationName} WHERE id='${id}'`
    );
    return query;
  }

  private async load() {
    try {
      const query = await this.connection.query(
        `CREATE TABLE IF NOT EXISTS owners(
          id SERIAL PRIMARY KEY, full_name VARCHAR(80),
          driving_license_number VARCHAR(10), address VARCHAR(50),
          year_of_birth VARCHAR(4), sex VARCHAR(1));

        CREATE TABLE IF NOT EXISTS cars(
          id SERIAL PRIMARY KEY, plate_number VARCHAR(10),
          engine_number VARCHAR(10), color VARCHAR(30),
          brand VARCHAR(30),
          owner_id INTEGER REFERENCES owners(id));

        CREATE TABLE IF NOT EXISTS employees(id SERIAL PRIMARY KEY, full_name VARCHAR(80), position VARCHAR(50));

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
