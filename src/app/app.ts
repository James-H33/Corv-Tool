import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@common/components/toast/toast.component';
import { ApplicationActions } from '@common/store/application/application.actions';
import { Store } from '@ngrx/store';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'ct-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [RouterOutlet, NavComponent, ToastComponent],
})
export class App implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(ApplicationActions.init());
  }
}
