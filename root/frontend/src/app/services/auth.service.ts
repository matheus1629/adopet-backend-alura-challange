import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login<IForm>(loginData: IForm, userType: string): Observable<IForm> {
    return this.http.post<IForm>(`http://localhost:8000/auth/signin/${userType}`, loginData);
  }
}
