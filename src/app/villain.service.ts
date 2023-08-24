import { Injectable } from '@angular/core';
import { Villain } from './villain';
import { VILLAINS } from './mock-villain';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class VillainService {
  private villainsUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  /** GET villains */
  getVillains(): Observable<Villain[]> {
    const villains = of(VILLAINS);
    this.messageService.add('VillainService: fetched villains');
    return villains;
  }

  /** DELETE: delete the villain from the server */
  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

  /** POST: add a new villain to the server */
  addVillain(villain: Villain): Observable<Villain> {
    return this.http
      .post<Villain>(this.villainsUrl, villain, this.httpOptions)
      .pipe(
        tap((newVillain: Villain) =>
          this.log(`added villain w/ id=${newVillain.id}`)
        ),
        catchError(this.handleError<Villain>('addVillain'))
      );
  }

  /** GET hero by id.*/
  getVil(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap((_) => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>(`getVil id=${id}`))
    );
  }

  /** PUT: update the villain on the server */
  updateVil(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap((_) => this.log(`updated villain id=${villain.id}`)),
      catchError(this.handleError<any>('updateVil'))
    );
  }

  /** Log a VillainService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`VillainService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
