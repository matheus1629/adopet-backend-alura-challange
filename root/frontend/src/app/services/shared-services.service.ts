import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private picture = new Subject<string | undefined>();

  public pictureUpdated$: Observable<string | undefined > = this.picture.asObservable();

  public pictureSender(data: string | undefined) {
    this.picture.next(data);
  }
}
