import { Component, inject, OnInit } from '@angular/core';
import { UsersListComponent } from '@libs/users/users-list/users-list.component';
import { Store } from '@ngrx/store';
import { AdminHubActions } from '../store/admin-hub.actions';
import { selectAdminViewUsers } from '../store/admin-hub.selectors';

@Component({
  selector: 'ct-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  imports: [UsersListComponent],
})
export class AdminUsersComponent implements OnInit {
  store = inject(Store);

  users = this.store.selectSignal(selectAdminViewUsers);

  ngOnInit(): void {
    this.store.dispatch(AdminHubActions.loadUsersInit());
  }

  loadNextSetOfUsers(): void {
    this.store.dispatch(AdminHubActions.loadNextSetOfUsers());
  }
}
