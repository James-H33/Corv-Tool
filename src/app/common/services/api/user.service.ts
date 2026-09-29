import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Observable } from 'rxjs';
import { User } from '@common/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  appService = inject(ApplicationService);
  baseUrl = this.appService.getBaseApiUrl();

  create(payload: { email: string; password: string }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users/register`, payload, {
      withCredentials: true,
    });
  }

  getUserIdsForView(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/users/admin/ids-for-view`, {
      withCredentials: true,
    });
  }

  getUsersByPage(page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/admin`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
      },
      withCredentials: true,
    });
  }

  getUsersByIds(ids: string[]): Observable<User[]> {
    return this.http.post<User[]>(
      `${this.baseUrl}/users/admin/by-ids`,
      { ids },
      { withCredentials: true },
    );
  }
}
