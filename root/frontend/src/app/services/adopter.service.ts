import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdopterService {
  constructor(private http: HttpClient) {}

  getAdopter<IAccountData>(): Observable<IAccountData> {
    return this.http.get<IAccountData>('/adopter/loggedUser/info');
  }

  getAdopterPicture(): Observable<{ picture: string | null }> {
    return this.http.get<{ picture: string | null }>('/adopter/loggedUser/picture');
  }

  createAdopter<IFormRegisterAccount>(formData: IFormRegisterAccount): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    return this.http.post<IFormRegisterAccount>('/auth/signup/adopter', formData, { headers });
  }

  editAdopter<IAccountEdit>(formData: IAccountEdit): Observable<IAccountEdit> {
    return this.http.patch<IAccountEdit>('/adopter', formData);
  }
}
