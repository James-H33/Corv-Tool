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

  vinParts = computed(() => {
    const car = this.car();

    if (!car) {
      return [];
    }

    return this.getVinParts(car.vin);
  });

  vinData = computed(() => {
    const car = this.car();

    if (!car) {
      return null;
    }

    return decodeVin(car.vin, car.year);
  });

  private getVinParts(vin: string): string[] {
    const {
      make,
      series,
      bodyStyle,
      modelYear,
      assemblyPlant,
      productionSequence,
    } = decodeVin(vin, this.car()?.year || '');

    return [
      make.value,
      series.value,
      bodyStyle.value,
      modelYear.value,
      assemblyPlant.value,
      productionSequence.value,
    ];
  }
}
