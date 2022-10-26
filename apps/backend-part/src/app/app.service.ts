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

  // get by id functions
  public async getByIdFromRelation(id: number, relation: string) {
    const query = await this.connection.query(
      `SELECT * FROM ${relation} WHERE id='${id}'`
    );
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
      INSERT INTO inspections(car_id, employee_id, inspection_result, date) VALUES(
        (SELECT id FROM cars WHERE cars.plate_number = '${inspection.car_plate_number}'),
        (SELECT id FROM employees WHERE employees.full_name = '${inspection.employee_full_name}'),
        ${inspection.inspection_result}, ${inspection.date});`);

    return query;
  }

  // delete functions
  public async deleteFromRelationById(id: number, relationName: string) {
    const query = await this.connection.query(
      `DELETE FROM ${relationName} WHERE id='${id}'`
    );
    return query;
  }

  // update functions
  public async updateEmployeeById(id: number, employee: Employee) {
    const query = await this.connection.query(
      `UPDATE employees
      SET full_name='${employee.full_name}',
          position='${employee.position}'
      WHERE id='${id}'`
    );

    return query;
  }

  public async updateCarById(id: number, car: Car) {
    const query = await this.connection.query(`
      UPDATE cars
      SET plate_number='${car.plate_number}',
          engine_number='${car.engine_number}',
          color='${car.color}',
          brand='${car.brand}',
          owner_id='(SELECT id FROM owners WHERE owners.full_name='${car.owner_full_name}')'
      WHERE id='${id}'`);

    return query;
  }

  public async updateOwnerById(id: number, owner: Owner) {
    const query = await this.connection.query(`
      UPDATE owners
        SET address='${owner.address}',
        SET driving_license_number='${owner.driving_license_number}',
        SET full_name='${owner.full_name}',
        SET sex='${owner.sex}',
        SET year_of_birth='${owner.year_of_birth}'
      WHERE id='${id}'`);

    return query;
  }

  public async updateInspectionById(id: number, inspection: Inspection) {
    const query = await this.connection.query(`
      UPDATE inspection
        SET car_id='(SELECT id FROM cars WHERE cars.plate_number='${inspection.car_plate_number}')',
        SET employee_id='(SELECT id FROM employees WHERE employees.full_name='${inspection.employee_full_name}')',
        SET date='${inspection.date}',
        SET inspection_result='${inspection.inspection_result}'
      WHERE id='${id}'`);

    return query;
  }

  private async load() {
    try {
      // maybe try cascade
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
          id SERIAL PRIMARY KEY,
          car_id INTEGER REFERENCES cars(id),
          employee_id INTEGER REFERENCES employees(id),
          date TIMESTAMP,
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
