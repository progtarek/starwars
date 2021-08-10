import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private apiUrl = environment.apiRoot;

  constructor(private http: HttpClient) {}

  public get(path: string, params: any): Observable<unknown> {
    return this.http.get<Observable<unknown>>(`${this.apiUrl}/${path}`, {
      ...params,
    });
  }

  public post(path: string, params: any): Observable<unknown> {
    return this.http.post<Observable<unknown>>(`${this.apiUrl}/${path}`, {
      ...params,
    });
  }

  public patch(path: string, payload: unknown): Observable<unknown> {
    return this.http.patch<Observable<unknown>>(
      `${this.apiUrl}/${path}`,
      payload
    );
  }

  public delete(path: string): Observable<unknown> {
    return this.http.delete<Observable<unknown>>(`${this.apiUrl}/${path}`);
  }
}
