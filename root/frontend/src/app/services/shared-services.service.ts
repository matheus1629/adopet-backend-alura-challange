import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private picture = new Subject<any>();

  public pictureUpdated$: Observable<any> = this.picture.asObservable();

  public pictureSender(data:any) {
    this.picture.next(data);
  }
}
