import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  constructor(private http: HttpClient) {}

  getDonor<IAccountData>(): Observable<IAccountData> {
    return this.http.get<IAccountData>('/donor/loggedUser/info');
  }

  getDonorPicture(): Observable<{ picture: string | null }> {
    return this.http.get<{ picture: string | null }>('/donor/loggedUser/picture');
  }

  createDonor<IFormRegisterAccount>(formData: IFormRegisterAccount): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    return this.http.post<IFormRegisterAccount>('/auth/signup/donor', formData, { headers });
  }

  editDonor<IAccountEdit>(formData: IAccountEdit): Observable<IAccountEdit> {
    return this.http.patch<IAccountEdit>('/donor', formData);
  }
}
