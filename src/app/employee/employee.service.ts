import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {IEmployee} from './IEmployee';
import { Observable, throwError} from 'rxjs';
import {catchError } from 'rxjs/operators';


@Injectable({
    'providedIn':"root"
})
export class employeeService {
    constructor(private httpClient: HttpClient) { }
    baseUrl = "http://localhost:4000/employees";

// GET Request
    getEmployees(): Observable<IEmployee[]> {
        return this.httpClient.get<IEmployee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

// ERROR Handling
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('Client side Error' + errorResponse.error.message);
        }
        else {
            console.log('server side Error' + errorResponse.error);
        }
        return throwError('probelm with service, Please try again')

    }
// GET ID
    getEmployee(id:number):Observable<IEmployee>{
        return this.httpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError))
    }
// POST Method
    addEmployee(employee:IEmployee):Observable<IEmployee>{
        return this.httpClient.post<IEmployee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-type':'application/json'
            })

        })
        .pipe(catchError(this.handleError))
    }

    //PUT Method
    updateEmployee(employee:IEmployee):Observable<void>{
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-type':'application/json'
            })
        })
        .pipe(catchError(this.handleError))

    }

    // Delete Method
    deleteEmployee(id:number):Observable<void>{
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError))
    }
}

