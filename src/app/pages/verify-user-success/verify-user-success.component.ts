import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-verify-user-success',
  templateUrl: './verify-user-success.component.html',
  styleUrls: ['./verify-user-success.component.scss'],
  imports: [],
})
export class VerifyUserSuccessComponent implements OnInit {
  router = inject(Router);
  count = signal(5);

  constructor() {
     effect(() => {
      if (this.count() === 0) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    const countdownInterval = setInterval(() => {
      const currentCount = this.count();

      console.log('Current count:', currentCount);

      if (currentCount > 0) {
        this.count.set(currentCount - 1);
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
}
