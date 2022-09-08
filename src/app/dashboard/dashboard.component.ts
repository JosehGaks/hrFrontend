import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next : employees => {
        console.log(employees)
        this.employees = employees.employees},
      error: err => console.error(err) 
    })
  }

}
