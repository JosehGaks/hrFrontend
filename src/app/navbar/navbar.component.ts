import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navLinks = ['Dashboard','employees','departments','benefits'];
  activeIndex:any;
  index:any;
  collapsed= true;

  loggedIn:boolean = false;
  user:User | undefined;

  constructor(private auth:AuthService) { }

  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn();
    if (this.loggedIn) {
      this.user = this.auth.currentUser.user;
    }
    console.log(this.loggedIn)
  }

}
