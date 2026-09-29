import { Component, inject, input } from '@angular/core';
import { User } from '@common/types/user.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ct-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  store = inject(Store);

  users = input<User[]>([]);
}
