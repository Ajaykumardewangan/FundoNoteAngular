import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  private API_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getLabels(token: string): Observable<any> {
    return this.http.get<any>(this.API_URL + 'user/label/get_labels', { headers: new HttpHeaders().set('token', token)});
    }

    addlabeltonote(url: any, label: any) {
      console.log(localStorage.getItem('token'));
      return this.http.post(this.API_URL + url, label,
        { headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
    }

    createLabel(labeldto: any) {
      return this.http.post(this.API_URL + 'user/label/create_label', labeldto,
          {headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
      }

      updateLabel(url: any, labelDto: any) {
        return this.http.put(this.API_URL + url, labelDto,
        {headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
      }

      deleteLabel(url: any) {
        return this.http.delete(this.API_URL + url,
          {headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
      }
}
