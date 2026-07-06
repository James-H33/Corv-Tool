import { Component, computed, input } from '@angular/core';
import { Car } from '@common/types/car.interface';
import { decodeVin } from '@common/utils/decode/vin/decode.function';

@Component({
  selector: 'ct-vin-sketch',
  templateUrl: './vin-sketch.component.html',
  styleUrls: ['./vin-sketch.component.scss'],
})
export class VinSketchComponent {
  car = input<Car | null | undefined>();

  vinData = computed(() => {
    const car = this.car();

    if (!car) {
      return null;
    }

    return decodeVin(car.vin, car.year);
  });
}
