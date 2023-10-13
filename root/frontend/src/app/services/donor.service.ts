import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  constructor(private http: HttpClient) {}

  getDonor<IAccountData>(): Observable<IAccountData> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('user_token_adopet');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<IAccountData>('http://localhost:8000/donor/loggedUser/info', {
      headers: headers,
    });
  }

  getDonorPicture(): Observable<{ picture: string | null }> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('user_token_adopet');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<{ picture: string | null }>(
      'http://localhost:8000/donor/loggedUser/picture',
      {
        headers: headers,
      }
    );
  }

  createDonor<IFormRegisterAccount>(formData: IFormRegisterAccount): Observable<any> {
    return this.http.post<IFormRegisterAccount>(
      'http://localhost:8000/auth/signup/donor',
      formData
    );
  }

  editDonor<IAccountEdit>(formData: IAccountEdit): Observable<IAccountEdit> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('user_token_adopet');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.patch<IAccountEdit>('http://localhost:8000/donor', formData, {
      headers: headers,
    });
  }
}
