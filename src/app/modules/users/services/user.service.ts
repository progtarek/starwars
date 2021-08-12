import { QueryParams } from './../../../shared/models/QueryParams';
import { UsersList } from './../models/UsersList';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  peopleUrl = `${environment.apiRoot}/people`;
  queryParamsSubject = new BehaviorSubject<QueryParams>(new QueryParams());

  constructor(private http: HttpClient) {}

  getUsersList(params?: any): Observable<UsersList> {
    return this.http.get<UsersList>(this.peopleUrl, { params }).pipe(
      mergeMap(
        ({ results, ...rest }) =>
          forkJoin(
            results.map((user) =>
              this.http
                .get(user.homeworld as unknown as string)
                .pipe(map((homeworld) => ({ ...user, homeworld })))
            )
          ),
        ({ results, ...rest }, populatedUsers) =>
          ({
            results: populatedUsers,
            ...rest,
          } as UsersList)
      ),
      catchError(this.handleError)
    );
  }

  handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err?.status}: ${err?.body?.error}`;
    }

    return throwError(errorMessage);
  }
}
