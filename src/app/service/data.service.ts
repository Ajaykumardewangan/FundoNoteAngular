import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private subject = new Subject<any>();

  sendMessage(message: any) {
      console.log(message);
      this.subject.next({ text: message });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      console.log(this.subject);
      return this.subject.asObservable();
  }
}
