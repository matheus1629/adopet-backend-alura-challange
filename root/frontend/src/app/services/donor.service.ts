import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  constructor(private http: HttpClient) {}

  createDonor<IForm>(formData: IForm): Observable<IForm> {
    return this.http.post<IForm>('http://localhost:8000/auth/signup/donor', formData);
  }
}
