import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin!: boolean;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService
    ) { }

  signIn(credentials:any){
    this.authService.login(credentials).subscribe({
      next:(result:any) => {
        if (result) {
          this.router.navigate(['/'])

        } else {
          this.invalidLogin = true
        }
      },
      error: err => this.invalidLogin = true
    })
  }
  ngOnInit(): void {
  }

}
