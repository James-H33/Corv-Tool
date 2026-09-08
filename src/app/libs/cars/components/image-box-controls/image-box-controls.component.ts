import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ct-image-box-controls',
  templateUrl: './image-box-controls.component.html',
  styleUrls: ['./image-box-controls.component.scss'],
})
export class ImageBoxControlsComponent {
  isUsingSketchView = input<boolean>(false);

  viewTypeChange = output<'actual' | 'sketch'>();

  useSketchView(): void {
    this.viewTypeChange.emit('sketch');
  }

  useActualView(): void {
    this.viewTypeChange.emit('actual');
  }
}
