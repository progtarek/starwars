import { QueryParams } from './../../../shared/models/QueryParams';
import { UsersList } from './../models/UsersList';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  peopleUrl = `${environment.apiRoot}/people`;
  queryParamsSubject = new BehaviorSubject<QueryParams>(new QueryParams());

  constructor(private http: HttpClient) {}

  getUsersList(params?: any): Observable<UsersList> {
    return this.http.get<UsersList>(this.peopleUrl, { params }).pipe(
      // tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
