import { Component } from '@angular/core';

@Component({
  selector: 'ct-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  users = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', totalCars: 2 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', totalCars: 1 },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'User', totalCars: 3 },
  ];
}
