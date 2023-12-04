import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AdoptionStatus } from 'src/shared/enums/adoptionStatus.enum';
import { PetSize } from 'src/shared/enums/petSize.enum';
import { IMessageDetails } from 'src/shared/interfaces/messageDetails.interface';
import { IMessagesPreviewPagination } from 'src/shared/interfaces/messagesPreview.interface';
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
    pageSize: number,
    petName: string | undefined = '',
    adopterDonorName: string | undefined = '',
    dataOrder: string | undefined = 'desc',
    adoptionStatus: string | undefined = ''
  ): Observable<IMessagesPreviewPagination> {
    const params = new HttpParams()
      .set('pageIndex', currentPage)
      .set('pageSize', pageSize)
      .set('petName', petName)
      .set('adopterDonorName', adopterDonorName)
      .set('dateOrder', dataOrder)
      .set('adoptionStatus', adoptionStatus);

    return this.http.get<IMessagesPreviewPagination>('/message/donor/preview', { params }).pipe(
      map((data) => ({
        count: data.count,
        rows: data.rows.map((message) => ({
          ...message,
          createdAt: message.createdAt.slice(0, 10),
          adoptionStatus:
            AdoptionStatus[message.adoptionStatus.toUpperCase() as keyof typeof AdoptionStatus],
        })),
      }))
    );
  }

  getAllMessagesByAdopterPreview(
    currentPage: number,
    pageSize: number,
    petName: string | undefined = '',
    adopterDonorName: string | undefined = '',
    dataOrder: string | undefined = 'desc',
    adoptionStatus: string | undefined = ''
  ): Observable<IMessagesPreviewPagination> {
    const params = new HttpParams()
      .set('pageIndex', currentPage)
      .set('pageSize', pageSize)
      .set('petName', petName)
      .set('adopterDonorName', adopterDonorName)
      .set('dateOrder', dataOrder)
      .set('adoptionStatus', adoptionStatus);

    return this.http.get<IMessagesPreviewPagination>('/message/adopter/preview', { params }).pipe(
      map((data) => ({
        count: data.count,
        rows: data.rows.map((message) => ({
          ...message,
          createdAt: message.createdAt.slice(0, 10),
          adoptionStatus:
            AdoptionStatus[message.adoptionStatus.toUpperCase() as keyof typeof AdoptionStatus],
        })),
      }))
    );
  }

  getDonorMessageDetailsById(id: number): Observable<IMessageDetails> {
    return this.http.get<IMessageDetails>(`/message/donor/${id}/message-details`).pipe(
      map((data) => ({
        ...data,
        adoptionStatus:
          AdoptionStatus[data.adoptionStatus.toUpperCase() as keyof typeof AdoptionStatus],
        Pet: {
          ...data.Pet,
          size: PetSize[data.Pet.size.toUpperCase() as keyof typeof PetSize],
        },
      }))
    );
  }

  getAdopterMessageDetailsById(id: number): Observable<IMessageDetails> {
    return this.http.get<IMessageDetails>(`/message/adopter/${id}/message-details`).pipe(
      map((data) => ({
        ...data,
        adoptionStatus:
          AdoptionStatus[data.adoptionStatus.toUpperCase() as keyof typeof AdoptionStatus],
        Pet: {
          ...data.Pet,
          size: PetSize[data.Pet.size.toUpperCase() as keyof typeof PetSize],
        },
      }))
    );
  }

  createMessage(body: ISendMessage): Observable<void> {
    return this.http.post<void>('/message', body);
  }

  updateMessageAdoptionStatus(idMessage: number, body: {}): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`/message/donor/${idMessage}/adoption-status`, body);
  }
}
