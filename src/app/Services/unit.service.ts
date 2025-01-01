import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUnit } from '../Models/iunit'; 

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  //private apiUrl = 'https://localhost:7200/api/unit';
  private apiUrl = 'https://localhost:44301/api/unit';
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('usertoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Correct header format
    });
  }
  constructor(private http: HttpClient) { }

  getUnits(): Observable<IUnit[]> {
    return this.http.get<IUnit[]>(this.apiUrl);
  }

  getUnit(id: number): Observable<IUnit> {
    return this.http.get<IUnit>(`${this.apiUrl}/${id}`,{headers:this.getHeaders()});
  }

  addUnit(unit: IUnit): Observable<IUnit> {
    return this.http.post<IUnit>(this.apiUrl, unit,{headers:this.getHeaders()});
  }

  updateUnit(id: number, unit: IUnit): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, unit,{headers:this.getHeaders()});
  }

  deleteUnit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers:this.getHeaders()});
  }
}