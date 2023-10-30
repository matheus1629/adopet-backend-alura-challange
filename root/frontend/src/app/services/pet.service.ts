import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { IPet, IPetPagination } from './../../shared/interfaces/pet.interface';
import { IPetEdit } from 'src/shared/interfaces/petEdit.interface';
import { PetSize } from 'src/shared/enums/petSize.enum';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getAllPetsAvailable(currentPage: number, pageSize: number): Observable<IPetPagination> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    const params = new HttpParams().set('pageIndex', currentPage).set('pageSize', pageSize);

    return this.http.get<IPetPagination>('/pet', { params, headers }).pipe(
      map((data) => ({
        ...data,
        rows: data.rows.map((pet) => ({
          ...pet,
          size: PetSize[pet.size.toUpperCase() as keyof typeof PetSize],
        })),
      }))
    );
  }

  getPetById(idPet: number): Observable<IPet> {
    const headers = new HttpHeaders();
    headers.set('skiptoken', 'true');

    return this.http.get<IPet>(`/pet/${idPet}`);
  }

  getPetsByIdAndDonor(idPet: number): Observable<IPet> {
    return this.http.get<IPet>(`/pet/petData/${idPet}/loggedDonor`);
  }

  getPetsByDonor(currentPage: number, pageSize: number): Observable<IPetPagination> {
    const params = new HttpParams().set('pageIndex', currentPage).set('pageSize', pageSize);

    return this.http.get<IPetPagination>('/pet/all/loggedDonor', { params });
  }

  createPet(petData: IPet): Observable<IPet> {
    return this.http.post<IPet>('/pet', petData);
  }

  editPet(petData: IPetEdit, idPet: number): Observable<IPet> {
    return this.http.patch<IPet>(`/pet/${idPet}`, petData);
  }

  deletePet(idPet: number): Observable<IPet> {
    return this.http.delete<IPet>(`/pet/${idPet}`);
  }
}
