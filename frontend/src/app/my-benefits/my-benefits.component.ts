import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-benefits',
  templateUrl: './my-benefits.component.html',
  styleUrls: ['./my-benefits.component.css']
})
export class MyBenefitsComponent implements OnInit {

  public isLoggedOn: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // check if user logged in 
    if(localStorage.getItem('token') != null){
      this.isLoggedOn = true;
    } else {
      this.isLoggedOn = false;
    }
    
  }

}
