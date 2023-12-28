import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient, private router: Router) {}

  login(data: Object): Observable<any> {
    return this._httpClient
      .post(environment.apiEndPoint + 'auth/login', data)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
}
