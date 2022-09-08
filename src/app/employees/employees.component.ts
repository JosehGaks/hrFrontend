import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  delete: boolean = false;
  agree: boolean = false;

  constructor(private employeeService:EmployeesService) { }

  private loadEmployees(){
    this.employeeService.getAll().subscribe({
      next : res => {
        console.log(res.employees);
        this.employees = res.employees;
        console.log(this.employees)
      },
      error: err => console.error(err) 
    })
    
  }

  deleteEmployee(url:string){
    this.delete = true;
    console.log(url)
    
    if(this.agree){
      this.delete = false;
      this.employeeService.deleteByUrl(url).subscribe({
      next:res => console.log("user deleted successfully"),
      error: err => {
        console.error(err)
      }
    })
    }

    this.delete = false;
    this.loadEmployees()
  }

  editEmployee(url:string){
    
  }

  ngOnInit(): void {
    this.loadEmployees()
  }

}
