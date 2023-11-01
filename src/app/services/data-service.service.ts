import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {DeleteReleaseResponse, ReleaseDataResponse} from '../_models/response.model';
import {DeletingReleaseInfo, SelectedWeekData} from "../_models/request.model";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  serverUrl = environment.serverUrl;

  selectedWeek(weekData: SelectedWeekData): Observable<ReleaseDataResponse> {
    return this.http.post<ReleaseDataResponse>(`${this.serverUrl}/selectedWeek`, weekData).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = 'Ошибка отправки данных: ' + error.message;
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  };

  deleteElement(deletingReleaseInfo: DeletingReleaseInfo): Observable<DeleteReleaseResponse> {
      return this.http.post<DeleteReleaseResponse>(`${this.serverUrl}/deleteRelease`, deletingReleaseInfo).pipe(
          catchError((error: HttpErrorResponse) => {
              const errorMessage = 'Ошибка отправки данных: ' + error.message;
              alert(errorMessage);
              return throwError(() => new Error(errorMessage));
            })
      );
  };
}
