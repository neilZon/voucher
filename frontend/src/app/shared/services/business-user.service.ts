import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAuth } from '../auth';
import { BusinessUser } from '../models/business-user';
import { environment } from 'src/environments/environment';

import * as jwtDecode from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessUserService implements IAuth {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  loginUser(email: string, password: string): import("rxjs").Observable<any> {
    throw new Error("Method not implemented.");
  }

  registerUser(businessUser: BusinessUser): Observable<any>{
    return this.http.post(`${this.BASE_URL}/business/register`,{
      businessName: businessUser.businessName,
      address: businessUser.address,
      phoneNumber: businessUser.phoneNumber,
      email: businessUser.email,
      password: businessUser.password,
      confirmPassword: businessUser.confirmPassword,
      firstname: businessUser.firstname,
      lastname: businessUser.lastname,
      affiliation: businessUser.affiliation,
    });
  }

  isRouteAuthenticated(){
    const token = localStorage.getItem('token');
    if (token != null){
      if (jwtDecode(token).type === 'business'){
        console.log(jwtDecode(token))
        return true;
      }
    }
    return false;
  }

  getUser(){}

}
