import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AssetOverviewService {

  baseUrl = environment.assetOverviewUrl

  constructor(private http: HttpClient) { }

  getAsset(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(),
      catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
