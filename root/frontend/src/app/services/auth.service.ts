import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  login<T>(loginData: T, userType: string): Observable<T> {
    console.log(loginData);

    return this.http.post<T>(`http://localhost:8000/auth/signin/${userType}`, loginData);
  }

  /*  getToken(): string {
    return localStorage.getItem('user_token_adopet');
  } */

  /*  isAuthenticated(): boolean {
    return this.getToken() != null;
  } */

  getUserType(): string | null {
    return localStorage.getItem('user_type_adopet');
  }

  logout(): void {
    localStorage.removeItem('user_token_adopet');
    localStorage.removeItem('user_type_adopet');
    this.router.navigate(['/']);
  }
}
