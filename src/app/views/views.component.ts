import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ct-views',
  template: `<div class="views-container">
    <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./views.component.scss'],
  imports: [RouterOutlet],
})
export class ViewsComponent {}
