import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/user.service';

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
  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  onSubmit(): void{
    this.userService.registerUser(
      this.email, 
      this.firstname,
      this.password,
      this.confirmPassword)
      .subscribe(
          data => {
            if(data.success){
              this.successMsg = "Sign up Successful";
              this.errorMsg = '';
            }
          }, 
          error => {
            this.errorMsg = error.error[0].msg
            this.successMsg = '';
          }
      );
  }

}
