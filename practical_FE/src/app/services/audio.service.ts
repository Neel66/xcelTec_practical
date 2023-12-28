import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private _httpClient: HttpClient) {}

  createAudio(data: Object): Observable<any> {
    return this._httpClient.post(environment.apiEndPoint + 'audio', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getAllAudio(data: any): Observable<any> {
    let params = new URLSearchParams();
    for (let key in data) {
      if (data[key]) {
        params.set(key, data[key]);
      }
    }
    return this._httpClient
      .get(environment.apiEndPoint + 'audio?' + params)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  deleteAudio(id: any): Observable<any> {
    return this._httpClient
      .delete(environment.apiEndPoint + 'audio/' + id + '/delete')
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  updateAudio(data: Object, id: any): Observable<any> {
    return this._httpClient
      .put(environment.apiEndPoint + 'audio/' + id, data)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
}
