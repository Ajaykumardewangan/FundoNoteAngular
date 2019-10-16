import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private API_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  createNote(note: any): Observable<any> {
    console.log(localStorage.getItem('token'));
    return this.http.post(this.API_URL + 'user/notes/create_note' , note,
        { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  getNotes(token: string): Observable<any> {
    return this.http.get<any>(this.API_URL + 'user/notes/get_notes', { headers: new HttpHeaders().set('token', token) });
  }

  updateNote(url: any, note: any, token: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<any>(this.API_URL + url, note, { headers: new HttpHeaders().set('token', token) });
  }

  archive(url: any): Observable<any> {
    console.log('inside archive');
    return this.http.put(this.API_URL + url, null, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  changeColor(url: any): Observable<any> {
    console.log('inside colorCange() method :' + url);
    console.log(this.API_URL + url);
    return this.http.put(this.API_URL + url, null, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  deleteNote(url: string): Observable<any> {
    return this.http.delete(this.API_URL + url, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  reminder(url: string): Observable<any> {
    return this.http.put(this.API_URL + url, null, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  getReminders(url: any): Observable<any> {
    return this.http.get<any>(this.API_URL + url, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  getArchivedNotes(url: any): Observable<any> {
    return this.http.get<any>(this.API_URL + url, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

  getTrash(url: any): Observable<any> {
    return this.http.get<any>(this.API_URL + url, {headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
}

