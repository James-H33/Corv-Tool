import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '@common/services/application.service';
import { ExtractedCarImageData } from '@common/types/extracted-car-image-data.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  http = inject(HttpClient);
  appService = inject(ApplicationService);
  baseUrl = this.appService.getBaseApiUrl();
  apiUrl = `${this.baseUrl}/file`;

  extractDataFromImage(file: File, forField: FormTypes): Observable<ExtractedCarImageData> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', forField);

    return this.http
      .post<ExtractedCarImageData>(`${this.apiUrl}/extract`, formData);
  }
}
