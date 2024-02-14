import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MtSelectDropdownService {

  http: any;

  constructor() { }

  setHttpClient(http: any) {
    this.http = http
  }



  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  post(url: string, data: any, param?: any) {
    return this.http
      .post(url, data, {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }
}
