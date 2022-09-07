import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
