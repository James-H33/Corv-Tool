import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bodyTagDecode',
})
export class BodyTagDecodePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Implement your decoding logic here
    // For example, if the body tag is encoded in a specific way, decode it accordingly
    // This is just a placeholder implementation and should be replaced with actual decoding logic
    return value;
  }
}
