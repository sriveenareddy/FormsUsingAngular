import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
//import 'rxjs/add/observable/of';
import {of} from 'rxjs'



@Injectable({
  providedIn: 'root'
})

export class ObserveService {
 private listemp={id:1,name:'hello',gender:'male'};
 list:string;
 //private _url:string="/app/application.json";
  constructor(private http:HttpClient) { }
  observe():Observable<any>{
     return of(this.listemp);
  }
  /*somename(): Observable<[]>{
    return this.http.get<[]>('https://jsonplaceholder.typicode.com/todos')
 
    */
  
   

    


}/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  endpoint: string = "https://restcountries.eu/rest/v2/name/";

  constructor(private http: HttpClient) { }

  searchCountry(term: string): Observable<Country[]> {
    let url = `${this.endpoint}${term}`;
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(this.handleError<Country[]>('countries', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }

}*/
