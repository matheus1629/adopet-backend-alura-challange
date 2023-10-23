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
export class DonorService {
  constructor(private http: HttpClient) {}

  getDonor(): Observable<IAccountData> {
    return this.http.get<IAccountData>('/donor/loggedUser/info');
  }

  getDonorPicture(): Observable<{ picture: string | null }> {
    return this.http.get<{ picture: string | null }>('/donor/loggedUser/picture');
  }

  createDonor(formData: IFormRegisterAccount): Observable<IToken> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    return this.http.post<IToken>('/auth/signup/donor', formData, { headers });
  }

  editDonor(formData: IAccountEdit): Observable<IAccountEdit> {
    return this.http.patch<IAccountEdit>('/donor', formData);
  }

  deleteDonor(): Observable<null> {
    return this.http.delete<null>('/donor');
  }
}
