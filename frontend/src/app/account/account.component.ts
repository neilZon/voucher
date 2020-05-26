import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/Users/user.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public userFirstname: string;
  public userEmail: string;

  constructor(private router: Router, private userService: UserService) { }

  /**
   * set user information on initialization
   */
  ngOnInit(): void {

    // get users info
    this.userService.getUser()
      .subscribe(
        res => {
          this.userFirstname = res.firstname;
          this.userEmail = res.email;
        },
        error => {
          console.log(error);
        }
      );
  }  

}
