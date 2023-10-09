import { IAccountEdit } from './../../shared/interfaces/accountEdit.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdopterService {
  constructor(private http: HttpClient) {}

  getAdopter<IAccountData>(): Observable<IAccountData> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('user_token_adopet');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<IAccountData>('http://localhost:8000/adopter/loggedUser/info', {
      headers: headers,
    });
  }

  createAdopter<IFormRegisterAccount>(
    formData: IFormRegisterAccount
  ): Observable<IFormRegisterAccount> {
    return this.http.post<IFormRegisterAccount>(
      'http://localhost:8000/auth/signup/adopter',
      formData
    );
  }

  editAdopter<IAccountEdit>(formData: IAccountEdit): Observable<IAccountEdit> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('user_token_adopet');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.patch<IAccountEdit>('http://localhost:8000/adopter', formData, {
      headers: headers,
    });
  }
}
