import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() user: any;
  @Output() formClose = new EventEmitter();
  @Output() updateError = new EventEmitter<string>();
  @Output() success = new EventEmitter<string>();
  employeeForm = new FormGroup({}) ;

  constructor(private builder:FormBuilder,private userService:EmployeesService) { }

  editEmployee(id:any,user:any){
    this.userService.update(user,id).subscribe({
      next: (updatedUser) => this.success.emit("user updated successfully"),
      error: (e:AppError) => {
        if (e instanceof NotFoundError) {
          this.updateError.emit("User not found")
        } else {
          this.updateError.emit(String(e));
        }

      }, 
      complete: () => console.info('complete') 
    })
  }

  save(){
    if(this.user){
      this.editEmployee(this.user.id,this.employeeForm?.value)
      this.formClose.emit()}
  }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      username: [this.user?.username,Validators.required],
      firstName: [this.user?.firstName,Validators.required],
      lastName:[this.user?.lastName,Validators.required],
      email:[this.user?.email,Validators.required],
      phoneNumber:[this.user?.phoneNumber,Validators.required],
      role:[this.user?.role,Validators.required]
    });
  }

}
