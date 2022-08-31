import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService:EmployeesService) { }

  private loadEmployees(){
     this.employeeService.getAll().subscribe({
      next: (res) => this.employees = res,
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

}
