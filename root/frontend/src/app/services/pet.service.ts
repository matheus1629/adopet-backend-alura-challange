import { IPet } from './../../shared/interfaces/pet.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http:HttpClient) { }

  getAllPetsAvailable():Observable<IPet[]>{
    return this.http.get<IPet[]>('http://localhost:8000/pet')
  }
}
