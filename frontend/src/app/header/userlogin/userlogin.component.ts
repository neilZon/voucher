import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserLoginComponent implements OnInit{

  public isLoggedIn: boolean = false;

  constructor(){}

  ngOnInit(): void {

    // check if JWT exists ie. user is logged in 
    if(localStorage.getItem('token') != null){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false; 
    }
  }
}
