import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-password-reset-success',
  templateUrl: './password-reset-success.component.html',
  styleUrls: ['./password-reset-success.component.scss'],
})
export class PasswordResetSuccessComponent implements OnInit {
  router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }
}
