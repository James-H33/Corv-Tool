import { Component, computed, input, output } from '@angular/core';
import { Car } from '@common/types/car.interface';
import { TrimTagSketchComponent } from '../trim-tag-sketch/trim-tag-sketch.component';
import { VinSketchComponent } from "../vin-sketch/vin-sketch.component";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ct-car-image-box',
  templateUrl: './car-image-box.component.html',
  styleUrls: ['./car-image-box.component.scss'],
  imports: [TrimTagSketchComponent, VinSketchComponent],
})
export class CarImageBoxComponent {
  car = input<Car | null | undefined>();
  type = input<'vin' | 'tag'>();
  isUsingSketchView = input<boolean>();
  isLoading = input<boolean>();

  extractedData = input<{ imageId: string } | null | undefined>();

  uploading = output();

  imageBaseUrl = environment.imageBaseUrl;

  imageUrlBasedOnType = computed(() => {
    const car = this.car();

    if (!car) {
      return '';
    }

    return this.type() === 'vin' ? car.vinImageUrl || '' : car.tagImageUrl || '';
  });

  imageUrl = computed(() => {
    const car = this.car();
    const baseUrl = this.imageBaseUrl;
    const urlBasedOnType = this.imageUrlBasedOnType();
    const extractedData = this.extractedData();
    const extractedImageUrl = extractedData?.imageId;

    if (!car) {
      return null;

    }
    const url = extractedImageUrl ? extractedImageUrl : urlBasedOnType;

    return url ? `${baseUrl}${url}` : null;
  });

  upload(): void {
    this.uploading.emit();
  }
}
