import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http:8081/localhost/';
  constructor(private http: HttpClient) { }

  registration(user: any) {
    console.log(this.apiUrl + 'user/registration');
    console.log(user);

    return this.http.post(this.apiUrl + 'user/registration', JSON.stringify(user));
}

login(user: any) {
  return this.http.post(this.apiUrl + 'user/login', JSON.stringify(user));
}
}
