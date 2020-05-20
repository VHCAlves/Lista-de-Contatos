import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Contact } from './contact';

const API = 'https://5d7290c55acf5e00147310c3.mockapi.io/api/v1/resource/contact';


@Injectable({
    providedIn: 'root'
  })
export class ContactService {
  
    constructor(private http: HttpClient) {}
      
    // Headers
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    
    listContacts(){
    
        return this.http
            .get<Contact[]>(API)
            .pipe(
            retry(2),
            catchError(this.handleError))
    }

    addContact(contact: Contact){

        return this.http
            .post<Contact>(API, JSON.stringify(contact), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError))
    }

    deleteContact(id: number) {
        return this.http.delete<Contact>(API + '/' + id, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `messagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };
}