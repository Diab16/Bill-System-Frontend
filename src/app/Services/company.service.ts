import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany } from '../Models/icompany';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl:string="https://localhost:7200/api/company"
  constructor(private http : HttpClient) 
  {}

  GetAllCompanies():Observable<ICompany[]>{
    return this.http.get<ICompany[]>(this.baseUrl);
  }
  AddCompany(company:ICompany){
    return this.http.post(this.baseUrl,company);
  }
}
