import { IPet, IPetPagination } from './../../shared/interfaces/pet.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getAllPetsAvailable(currentPage: number, pageSize: number): Observable<IPetPagination> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    const params = new HttpParams().set('pageIndex', currentPage).set('pageSize', pageSize);

    return this.http.get<IPetPagination>('/pet', { params, headers });
  }

  getPetsByDonor(currentPage: number, pageSize: number): Observable<IPetPagination> {
    const params = new HttpParams().set('pageIndex', currentPage).set('pageSize', pageSize);

    return this.http.get<IPetPagination>('/pet/petsData/loggedDonor', { params });
  }

  createPet(petData: IPet): Observable<IPet> {
    return this.http.post<IPet>('/pet', petData);
  }
}
