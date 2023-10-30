import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AdoptionStatus } from 'src/shared/enums/adoptionStatus.enum';
import {
  IMessagesPreview,
  IMessagesPreviewPagination,
} from 'src/shared/interfaces/messagesPreview.interface';
import { ISendMessage } from 'src/shared/interfaces/sendMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesByAdopter(): Observable<number[]> {
    return this.http.get<number[]>('/message/adopter');
  }

  getAllMessagesByDonorPreview(
    currentPage: number,
    pageSize: number
  ): Observable<IMessagesPreviewPagination> {
    const params = new HttpParams().set('pageIndex', currentPage).set('pageSize', pageSize);

    return this.http.get<IMessagesPreviewPagination>('/message/donor/preview', { params }).pipe(
      map((data) => ({
        count: data.count,
        rows: data.rows.map((message) => ({
          ...message,
          date: message.date.slice(0, 10),
          adoptionStatus:
            AdoptionStatus[message.adoptionStatus.toUpperCase() as keyof typeof AdoptionStatus],
        })),
      }))
    );
  }

  createMessage(body: ISendMessage): Observable<any> {
    return this.http.post<any>('/message', body);
  }
}
