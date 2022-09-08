import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @Input() create : any; 
  employeeForm = new FormGroup({});
  error: Error | undefined;

  @Output() formClose = new EventEmitter();


  constructor(private builder: FormBuilder,private userService:EmployeesService) { }

  createEmployee(){

    if (this.employeeForm && this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.userService.create(this.employeeForm?.value).subscribe({
      next : newUser => console.log(newUser),
      error: (err:AppError) => {
        if (err instanceof BadInput) {
          console.log(err.originalError)
        } else {
          throw new Error(err.originalError);
        }
      }
    });
    this.formClose.emit();
  }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      username: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      phoneNumber:['',Validators.required],
      role:['',Validators.required]
    })
  }

}
