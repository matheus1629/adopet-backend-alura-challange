import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AdoptionStatus } from 'src/shared/enums/adoptionStatus.enum';
import { IMessagesPreview } from 'src/shared/interfaces/messagesPreview.interface';
import { ISendMessage } from 'src/shared/interfaces/sendMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesByAdopter(): Observable<number[]> {
    return this.http.get<number[]>('/message/adopter');
  }

  getAllMessagesByDonorPreview(): Observable<IMessagesPreview[]> {
    return this.http.get<IMessagesPreview[]>('/message/donor/preview').pipe(
      map((data) =>
        data.map((messagePreview: IMessagesPreview) => {
          messagePreview.date = messagePreview.date.slice(0, 10);
          messagePreview.adoptionStatus =
            AdoptionStatus[
              messagePreview.adoptionStatus.toUpperCase() as keyof typeof AdoptionStatus
            ];
          return messagePreview;
        })
      )
    );
  }

  createMessage(body: ISendMessage): Observable<any> {
    return this.http.post<any>('/message', body);
  }
}
