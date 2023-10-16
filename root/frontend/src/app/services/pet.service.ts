import { IPet, IPetPagination } from './../../shared/interfaces/pet.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getAllPetsAvailable(currentPage: number, pageSize: number): Observable<IPetPagination> {
    return this.http.get<IPetPagination>(
      `http://localhost:8000/pet?pageIndex=${currentPage}&pageSize=${pageSize}`
    );
  }

  getPetsByDonor(): Observable<IPet[]> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('user_token_adopet');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<IPet[]>('http://localhost:8000/pet/petsData/loggedDonor', {
      headers: headers,
    });
  }
}
