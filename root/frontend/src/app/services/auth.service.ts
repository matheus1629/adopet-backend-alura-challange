import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ILogin } from 'src/shared/interfaces/login.interface';
import { IToken } from 'src/shared/interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: ILogin): Observable<IToken> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    return this.http.post<IToken>(`/auth/signin/${loginData.userType}`, loginData);
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
