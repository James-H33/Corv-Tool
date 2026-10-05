import { Component, inject, OnInit } from '@angular/core';
import { UsersListComponent } from '@libs/users/users-list/users-list.component';
import { Store } from '@ngrx/store';
import { AdminHubActions } from '../store/admin-hub.actions';
import {
  selectAdminViewUsers,
  selectIsLoadingUsers,
  selectNextSetOfUsersToLoad,
} from '../store/admin-hub.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  imports: [UsersListComponent],
})
export class AdminUsersComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  users = this.store.selectSignal(selectAdminViewUsers);
  isLoadingUsers = this.store.selectSignal(selectIsLoadingUsers);
  nextSetOfUsersToLoad = this.store.selectSignal(selectNextSetOfUsersToLoad);

  ngOnInit(): void {
    this.store.dispatch(AdminHubActions.loadUsersInit());
  }

  loadNextSetOfUsers(): void {
    console.log('Loading next set of users: ', this.nextSetOfUsersToLoad());
    if (this.nextSetOfUsersToLoad()?.length === 0) {
      console.log('No more users to load.');
      return;
    }

    this.store.dispatch(
      AdminHubActions.loadNextSetOfUsers({ userIds: this.nextSetOfUsersToLoad() || [] }),
    );
  }

  onUserClicked(userId: string): void {
    this.router.navigate(['/v/admin/users', userId]);
  }
}
