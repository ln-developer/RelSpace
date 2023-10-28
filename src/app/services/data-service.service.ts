import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {ReleaseData} from '../_models/response.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  serverUrl = environment.serverUrl;

  selectedWeek(weekData: object): Observable<ReleaseData> {
    return this.http.post<ReleaseData>(`${this.serverUrl}/selectedWeek`, weekData).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = 'Ошибка отправки данных: ' + error.message;
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
