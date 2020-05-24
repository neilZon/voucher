import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {UserService} from '../shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // members vars
  public email: string;
  public password: string;
  public errorMsg: string;
  public successMsg: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.loginUser(this.email, this.password)
    .subscribe(
      data => {
        if(data.success){
          this.successMsg = "Login Successful";
          this.errorMsg = '';
        }
      }, 
      error => {
        this.errorMsg = error.error.msg;
        this.successMsg = '';
      }
    );
  }

}
