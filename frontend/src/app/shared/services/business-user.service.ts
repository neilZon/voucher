import { Injectable } from '@angular/core';
import { IAuth } from '../auth';
import { HttpClient } from '@angular/common/http';
import { BusinessUser } from '../models/BusinessUsers/business-user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getUser(){}

}
