import { Occurrence } from './ocurrence.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OccurrenceService {

  baseUrl = "http://localhost:3001/occurrence";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: isError ? 'msg-error' : 'msg-sucess'
    });
  }

  create(occurrence: Occurrence): Observable<Occurrence> {
    return this.http.post<Occurrence>(this.baseUrl, occurrence).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(page: number = 0, limit: number = 0): Observable<any> {
    let params = new HttpParams();

    if (page) {
      page++;
      params = params.set('_page', page.toString());
    }

    if (limit) {
      params = params.set('_limit', limit.toString());
    }

    return this.http.get<Occurrence>(this.baseUrl, { params, observe: 'response' }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );;

  }

  readById(id: string): Observable<Occurrence> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Occurrence>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  update(occurrence: Occurrence): Observable<Occurrence> {
    const url = `${this.baseUrl}/${occurrence.id}`
    return this.http.put<Occurrence>(url, occurrence).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  delete(id: number) {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Occurrence>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro ao processar a solicitação', true);
    return EMPTY
  }

}
