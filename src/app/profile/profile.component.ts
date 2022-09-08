import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { AuthService } from '../services/auth.service';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  @Input() user: any;
  userForm = new FormGroup({});
  infoPage: boolean = true;
  avatarUrl: string = '';
  error:any = null;

  constructor(
    private builder:FormBuilder,
    private userService:EmployeesService,private auth:AuthService
  ) { }

  editUser(id:any,user:any){
    this.userService.update(user,id).subscribe({
      next: (updatedUser) => console.log(updatedUser),
      error: (e:AppError) => {
        if (e instanceof NotFoundError) {
          
        } else {
          throw e;
        }

      }, 
      complete: () => console.info('complete') 
    })
  }



  save(){
    if(this.user){
      this.editUser(this.user.id,this.userForm?.value)
    }
  }

  

  private onLoad(){
    this.user = this.auth.currentUser.user
  }

  ngOnInit(): void {
    this.onLoad();
    this.userForm = this.builder.group({
      username: [this.user?.username,Validators.required],
      firstName: [this.user?.firstName,Validators.required],
      lastName:[this.user?.lastName,Validators.required],
      email:[this.user?.email,Validators.required],
      phoneNumber:[this.user?.phoneNumber,Validators.required],
      role:[this.user?.role,Validators.required]
    });

    

    this.avatarUrl = `https://ui-avatars.com/api/?name=${this.user.username}`;
  }

}
