import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MtSelectDropdownService } from '../../../mt-select-dropdown/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private dropdownService: MtSelectDropdownService) {
    dropdownService.setHttpClient(http);
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

  get(url: string, param: any) {
    return this.http
      .get(url, {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }

  getFile(url: string, param: any) {
    return this.http
      .get(url, {
        params: param,
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      })
      .pipe(catchError(this.handleError));
  }
  post(url: string, data: any, param: any) {
    return this.http
      .post(url, data, {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }


  patch(url: string, data: any, param: any) {
    return this.http
      .patch(url, data, {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }

  delete(url: string, param: any) {
    return this.http
      .delete(url, {
        params: param,
      })
      .pipe(catchError(this.handleError));
  }


}
