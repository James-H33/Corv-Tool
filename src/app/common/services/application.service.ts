import { inject, Injectable } from '@angular/core';
import { ApplicationActions } from '@common/store/application/application.actions';
import { selectAuthToken } from '@common/store/application/application.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private store = inject(Store);

  private authToken = this.store.selectSignal(selectAuthToken);

  public authToken$ = this.store.select(selectAuthToken);

  getBaseApiUrl(): string {
    return 'http://localhost:3000';
  }

  getAuthToken(): string | null {
    return this.authToken();
  }

  setAuthToken(token: string): void {
    this.store.dispatch(ApplicationActions.setAuthToken({ authToken: token }));
  }

  logout(): void {
    this.store.dispatch(ApplicationActions.logout());
  }
}
