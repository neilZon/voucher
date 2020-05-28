import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessUserService } from '../shared/services/business-user.service';
import { BusinessUser } from '../shared/models/business-user';
import { error } from 'protractor';

@Component({
  selector: 'app-business-sign-up',
  templateUrl: './business-sign-up.component.html',
  styleUrls: ['./business-sign-up.component.css']
})
export class BusinessSignUpComponent implements OnInit {

  public businessname: string;
  public address: string;
  public phoneNumber: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public firstname: string;
  public lastname: string;
  public affiliation: string;
  public errorMsg: string;
  public successMsg: string;

  constructor(private businessUserService: BusinessUserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const businessUser: BusinessUser = new BusinessUser(
      this.businessname,
      this.address,
      this.phoneNumber,
      this.email,
      this.password,
      this.confirmPassword,
      this.firstname,
      this.lastname,
      this.affiliation
    )

    this.businessUserService.registerUser(businessUser)
      .subscribe(
        res => {
          if(res.success){
            this.successMsg = ""
            this.errorMsg = '';
            console.log(res)

            // store token
            localStorage.setItem('token', res.token);

            // redirect
            console.log(res.token)
            this.router.navigate(['/business/account']);
          }
          console.log(res)
        },
        error => {
          this.errorMsg = error.error[0].msg;
          this.successMsg = '';
        }
      )

  }

}
