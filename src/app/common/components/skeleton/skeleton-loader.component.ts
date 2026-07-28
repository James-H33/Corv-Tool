import { Component, input } from '@angular/core';

@Component({
  selector: 'ct-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent {
  width = input<number | null>(null);
  height = input<number | null>(null);
  borderRadius = input<number | null>(null);

  widthStyle = () => (this.width() ? `${this.width()}px` : '100%');
  heightStyle = () => (this.height() ? `${this.height()}px` : '100%');

  borderRadiusStyle = () => (this.borderRadius() ? `${this.borderRadius()}px` : '4px');
}
