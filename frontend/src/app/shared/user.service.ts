import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { 

  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`,
    {email, password});
  }

  registerUser(email: string,firstname: string, password: string, confirmPassword: string): Observable<any>{
    return this.http.post(`${this.BASE_URL}/register`, 
      {email, firstname, password, confirmPassword});


  
  }


}
