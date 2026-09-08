import { Component, computed, input } from '@angular/core';
import { Car } from '@common/types/car.interface';
import { trimTagDecoder } from '@common/utils/decode/trim-tag/decode.function';

@Component({
  selector: 'ct-trim-tag-sketch',
  templateUrl: './trim-tag-sketch.component.html',
  styleUrls: ['./trim-tag-sketch.component.scss'],
})
export class TrimTagSketchComponent {
  car = input<Car | null | undefined>();

  trimTagData = computed(() => {
    const car = this.car();

    if (!car) {
      return null;
    }

    return trimTagDecoder(car.tagData, car.year);
  });
}
