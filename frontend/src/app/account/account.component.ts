import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/Users/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public User: User;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  //TODO: get user info on get request

  

}
