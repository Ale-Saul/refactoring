import { EmployeesRepository } from "./EmployeesRepository";
import { GreetingDelivery } from "./GreetingDelivery";
export class BirthdayService {
  constructor(greetingDelivery, employeesRepository) {
    this.greetingDelivery = GreetingDelivery;
    this.employeesRepository = EmployeesRepository;
  }

  sendGreetings(ourDate) {
    const employees = this.employeesRepository.getEmployeesByBirthDate(ourDate);

    employees.forEach(employee => {
      this.greetingDelivery.sendGreetingToEmployee(employee);
    });
  }
}