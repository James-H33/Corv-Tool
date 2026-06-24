import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '@common/services/application.service';
import { Car } from '@common/types/car.interface';
import { CreateCarDto } from '@common/types/dto/create-car.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  http = inject(HttpClient);
  appService = inject(ApplicationService);
  baseUrl = this.appService.getBaseApiUrl();
  apiUrl = `${this.baseUrl}/cars`;

  geAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/all`).pipe(
      map((response) => response),
    );
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response),
    );
  }

  createCar(car: CreateCarDto): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/create`, car).pipe(
      map((response) => response),
    );
  }

  updateCar(id: string, data: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/update/${id}`, data).pipe(
      map((response) => response),
    );
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
