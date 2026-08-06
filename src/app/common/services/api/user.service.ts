import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  appService = inject(ApplicationService);
  baseUrl = this.appService.getBaseApiUrl();

  create(payload: {
    email: string;
    password: string;
  }): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/users/register`,
      payload,
      { withCredentials: true },
    );
  }
}
