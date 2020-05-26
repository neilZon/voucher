import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css', "./userlogin/userlogin.component.css"]
})
export class HeadersComponent implements OnInit {

  public headerVariation: string;
  public logoVariation: string;

  constructor(private router: Router) { 
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange())
  }

  ngOnInit(): void {

  }

  // TODO: this is so trash we have to change this
  handleRouteChange(){
    if(this.router.url.includes('business')){
      if(this.router.url.match('/login')){
        this.headerVariation = "business-home-variant";
        this.logoVariation = "business-variant";
      }
      else if(this.router.url.match('/register')){
        this.headerVariation = "business-home-variant";
        this.logoVariation = "business-variant";
      }
      else if(this.router.url.match('/')){
        this.headerVariation = "business-home-variant";
        this.logoVariation = "business-variant";
      } 
    }
    else {
      if (this.router.url.match('/account') && localStorage.getItem('token') != null){
        this.headerVariation = "account-variant";
        this.logoVariation = "regular-variant";
      }
      else if (this.router.url.match('/login')){
        this.headerVariation = "user-login-variant";
        this.logoVariation = "regular-variant";
      }
      else if (this.router.url.match('/register')){
        this.headerVariation = "user-register-variant";
        this.logoVariation = "regular-variant";
      }
      else if(this.router.url.match('/')){
        this.headerVariation = "home-variant";
        this.logoVariation = "regular-variant";
      }
    }
  }

  /**
   * logout user and redirect to homepage 
   */
  logoutUser():void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
