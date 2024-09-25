import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl: string = "https://localhost:7200/api/Client";
  //baseUrl: string = "https://localhost:44301/api/Client";

  constructor(private http: HttpClient) { }

  GetAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  
}
