import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IType } from '../Models/iType';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
 baseUrl: string = "https://localhost:7200/api/Type";

  constructor(private http: HttpClient) { }

  GetAllTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl);
  }

  AddType(type: IType): Observable<any> {
    return this.http.post(this.baseUrl, type);
  }
}