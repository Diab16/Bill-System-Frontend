import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../Models/iclient'; 


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //private apiUrl = 'https://localhost:7200/api/client'; 
  private apiUrl = 'https://localhost:44301/api/client'; 

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('usertoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Correct header format
    });
  }
  constructor(private http: HttpClient) { }

  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl);
  }

  getClient(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.apiUrl}/${id}`,{headers:this.getHeaders()});
  }

  addClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, client);
  }

  updateClient(id: number, client: IClient): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, client ,{headers:this.getHeaders()});
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers:this.getHeaders()});
  }
}
