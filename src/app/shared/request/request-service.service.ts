import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ModifyReleaseListResponse, ReleaseDataResponse} from '../../_models/response.model';
import {AddingReleaseInfo, DeletingReleaseInfo, SelectedWeekData} from '../../_models/request.model';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  serverUrl = environment.serverUrl;

  getReleasesForSelectedWeek(weekData: SelectedWeekData): Observable<ReleaseDataResponse> {
    return this.http.post<ReleaseDataResponse>(`${this.serverUrl}/getReleasesForSelectedWeek`, weekData).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = 'Ошибка отправки данных: ' + error.message;
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  };

  deleteRelease(deletingReleaseInfo: DeletingReleaseInfo): Observable<ModifyReleaseListResponse> {
      return this.http.post<ModifyReleaseListResponse>(`${this.serverUrl}/deleteRelease`, deletingReleaseInfo).pipe(
          catchError((error: HttpErrorResponse) => {
              const errorMessage = 'Ошибка отправки данных: ' + error.message;
              alert(errorMessage);
              return throwError(() => new Error(errorMessage));
            })
      );
  };

  addRelease(addingReleaseInfo: AddingReleaseInfo): Observable<ModifyReleaseListResponse> {
    return this.http.post<ModifyReleaseListResponse>(`${this.serverUrl}/addRelease`, addingReleaseInfo).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = 'Ошибка отправки данных: ' + error.message;
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  };
}
