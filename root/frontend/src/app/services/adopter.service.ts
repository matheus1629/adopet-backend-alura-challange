import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IAccountData } from 'src/shared/interfaces/accountData.interface';
import { IAccountEdit } from 'src/shared/interfaces/accountEdit.interface';
import { IFormRegisterAccount } from 'src/shared/interfaces/formRegisterAccount.interface';
import { IToken } from 'src/shared/interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AdopterService {
  constructor(private http: HttpClient) {}

  getAdopter(): Observable<IAccountData> {
    return this.http.get<IAccountData>('/adopter/loggedUser/info');
  }

  getAdopterPicture(): Observable<{ picture: string | null }> {
    return this.http.get<{ picture: string | null }>('/adopter/loggedUser/picture');
  }

  createAdopter(formData: IFormRegisterAccount): Observable<IToken> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    return this.http.post<IToken>('/auth/signup/adopter', formData, { headers });
  }

  editAdopter(formData: IAccountEdit): Observable<IAccountEdit> {
    return this.http.patch<IAccountEdit>('/adopter', formData);
  }
}
