import { Component, OnInit } from '@angular/core';
import { AdminOperationsService } from '../admin-operations.service';
import { Admin } from 'src/admin';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  newEmployee: any = {};
  employeeHome = true;
  individualEmployee = false;
  addEmployee = false;
  editEmployee = false;
  message = '';
  empId: any=null;
  style = {};
  admin: Admin = new Admin();
  constructor(private service: AdminOperationsService) {}
  ngOnInit() {
    this.employeeHome = true;
    this.individualEmployee = false;
    this.addEmployee = false;
    this.editEmployee = false;
    this.newEmployee = {};
    this.getEmployees();
    this.updateAdminStatus();
  }
  updateAdminStatus() {
    this.service.getAdminDetails().subscribe((data: any) => {
      this.admin = data;
    });
  }
  getEmployees() {
    this.service.getAllEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  createEmployee() {
    this.service.addEmployee(this.newEmployee).subscribe(() => {
      this.newEmployee = {};
    });
    this.message = 'Employee Added Successfully!';
    this.style = {
      'text-align': 'center',
      color: 'green',
    };
    this.ngOnInit();
  }
  searchEmployee(id: number) {
    this.employeeHome = true;
    this.individualEmployee = false;
    this.addEmployee = false;
    this.editEmployee = false;
    this.newEmployee = {};
    this.updateAdminStatus();
    this.service
      .getEmployeeById(id)
      .subscribe((data: any) => (this.employees = [data]));
    this.empId=null;
      
  }
  deleteEmployee(id: number) {
    this.service.deleteEmployee(id).subscribe(() => {
      this.message = 'Employee Deleted Successfully!';
      this.style = {
        'text-align': 'center',
        color: 'red',
      };
      this.ngOnInit();
    });
  }

  viewEmployee(employee: any) {
    this.newEmployee = employee;
    this.individualEmployee = true;
    this.addEmployee = false;
    this.employeeHome = false;
    this.editEmployee = false;
  }
  enableAdd() {
    this.addEmployee = true;
    this.employeeHome = false;
    this.individualEmployee = false;
    this.editEmployee = false;
  }
  getEmployeeForEdit(newEmployee: any) {
    this.addEmployee = false;
    this.employeeHome = false;
    this.individualEmployee = false;
    this.editEmployee = true;
    this.newEmployee = newEmployee;
  }
  updateEmployee() {
    this.service.updateEmployee(this.newEmployee).subscribe(() => {
      this.newEmployee = {};
      this.message = 'Employee Updated Successfully!';
      this.style = {
        'text-align': 'center',
        color: 'green',
      };
      this.ngOnInit();
    });
  }
}
