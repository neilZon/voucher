import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAuth } from '../auth';
import { User } from '../models/Users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IAuth {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { 

  }

  /**
   * sends login post request to server and recieves httpresponse containing JWT token
   * @param email - string
   * @param password - string
   * 
   * @returns observable 
   */
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`,
    {email, password});
  }

  /**
   * sends register post request to server and recieves httpresponse containing JWT token
   * @param email - string 
   * @param firstname - string
   * @param password - string
   * @param confirmPassword - string
   * 
   * @returns observable 
   */
  registerUser(user: User): Observable<any>{
    return this.http.post(`${this.BASE_URL}/register`, 
      {
          email:user.email, 
          firstname: user.firstname, 
          password: user.password, 
          confirmPassword: user.confirmPassword
      });
  }

  /**
   * send get request for user information 
   */
  getUser(): Observable<any>{
    let headers = new HttpHeaders({Authorization: localStorage.getItem('token')});
    return this.http.get(`${this.BASE_URL}/account`, {headers:headers});
  }

  /**
   * TODO: implement this for my benefits page
   */
  getUserSubscriptions(){}


}
