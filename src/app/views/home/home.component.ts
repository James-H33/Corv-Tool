import { Component } from '@angular/core';
import { ButtonModule } from '@common/directives/button/button.module';

@Component({
  selector: 'ct-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ButtonModule,
  ],
})
export class HomeComponent {}
