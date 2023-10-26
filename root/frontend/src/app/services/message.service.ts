import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISendMessage } from 'src/shared/interfaces/sendMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesByAdopter(): Observable<number[]> {
    return this.http.get<number[]>('/message/adopter');
  }

  createMessage(body: ISendMessage): Observable<any> {
    return this.http.post<any>('/message', body);
  }
}
