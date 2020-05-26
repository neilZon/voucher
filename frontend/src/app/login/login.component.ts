import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {UserService} from '../shared/services/user.service';


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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * login and get response from server
   */
  onSubmit(): void {
    this.userService.loginUser(this.email, this.password)
    .subscribe(
      res => {
        if(res.success){

          // read back messages
          this.successMsg = "Login Successful";
          this.errorMsg = '';

          // store JWT
          localStorage.setItem('token', res.token);
          
          // redirect to landing page
          this.router.navigate(['/']);
          console.log(res.token)
        }
      }, 
      error => {
        this.errorMsg = error.error.msg;
        this.successMsg = '';
      }
    );
  }

}
