// repositories/EmployeesRepository.js
import fs from "fs";
import path from "path";
import { Employee } from "../Employee";

export class EmployeesRepository {
  constructor(fileName) {
    this.fileName = fileName;
  }

  getEmployees() {
    const data = fs.readFileSync(
      path.resolve(__dirname, `${this.fileName}`),
      "UTF-8"
    );

    const lines = data.split(/\r?\n/);
    lines.shift();
    return lines.map(line => {
      const employeeData = line.split(", ");
      return new Employee(
        employeeData[1],
        employeeData[0],
        employeeData[2],
        employeeData[3]
      );
    });
  }

  getEmployeesByBirthDate(ourDate) {
    const employees = this.getEmployees();
    return employees.filter(employee => employee.isBirthday(ourDate));
  }
}
