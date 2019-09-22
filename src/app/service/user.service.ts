import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  registration(user: any): Observable<any> {
    return this.http.post<any>(this.API_URL + 'user/registration', JSON.stringify(user), this.httpOptions);
}

login(user: any): Observable<any> {
  return this.http.post<any>(this.API_URL + 'user/login', JSON.stringify(user), this.httpOptions);
}

forgetPassword(email: string): Observable<any> {
  console.log(email);
  return this.http.post<any>(this.API_URL + 'user/forget_password', email, this.httpOptions );
}

resetPassword(user: any): Observable<any> {
  return this.http.post(this.API_URL + 'user/login', JSON.stringify(user));
}
}
