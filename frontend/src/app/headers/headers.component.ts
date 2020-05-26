import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css', "./userlogin/userlogin.component.css"]
})
export class HeadersComponent implements OnInit {

  public headerVariation: string;

  constructor(private router: Router) { 
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange())
  }

  ngOnInit(): void {

  }

  handleRouteChange(){
    if (this.router.url.match('/account') && localStorage.getItem('token') != null){
      this.headerVariation = "account-variant";

    }
    else if (this.router.url.match('/login')){
      this.headerVariation = "user-login-variant";
    }
    else if (this.router.url.match('/register')){
      this.headerVariation = "user-register-variant";
    }
    else if(this.router.url.match('/business')){
      this.headerVariation = "business-home-variant"
    }
    else if(this.router.url.match('/')){
      this.headerVariation = "home-variant";
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
