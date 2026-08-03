import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ct-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
  imports: [],
})
export class VerifyUserComponent {
  route = inject(ActivatedRoute);
  store = inject(Store);

  verifyToken = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('token'))));

  constructor() {
    const verifyEffect = effect(() => {
      const token = this.verifyToken();

      if (token) {
        this.store.dispatch(ApplicationActions.verifyUser({ token }));
        verifyEffect.destroy();
      }
    });
  }
}
