import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/Users/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // members vars
  public email: string;
  public firstname: string;
  public password: string;
  public confirmPassword: string;
  public errorMsg: string;
  public successMsg: string;

  // methods
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void{
    const user: User = new User(
      this.firstname,
      this.password, 
      this.confirmPassword,
      this.email
    );
    
    this.userService.registerUser(user)
      .subscribe(
          res => {
            if(res.success){

              this.successMsg = "Sign up Successful";
              this.errorMsg = '';

              // store token
              localStorage.setItem('token', res.token);
              
              // redirect
              console.log(res.token)
              this.router.navigate(['/']);
            }
          }, 
          error => {
            this.errorMsg = error.error[0].msg;
            this.successMsg = '';
          }
      );
  }

}
