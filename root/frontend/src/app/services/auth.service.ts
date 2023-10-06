import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login<T>(loginData: T, userType: string): Observable<T> {
    return this.http.post<T>(`http://localhost:8000/auth/signin/${userType}`, loginData);
  }
}
