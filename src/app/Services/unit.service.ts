import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUnit } from '../Models/iunit'; 

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private apiUrl = 'https://localhost:7200/api/unit';

  constructor(private http: HttpClient) { }

  getUnits(): Observable<IUnit[]> {
    return this.http.get<IUnit[]>(this.apiUrl);
  }

  getUnit(id: number): Observable<IUnit> {
    return this.http.get<IUnit>(`${this.apiUrl}/${id}`);
  }

  addUnit(unit: IUnit): Observable<IUnit> {
    return this.http.post<IUnit>(this.apiUrl, unit);
  }

  updateUnit(id: number, unit: IUnit): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, unit);
  }

  deleteUnit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}