import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany } from '../Models/icompany';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    //baseUrl:string="https://localhost:7200/api/company"
    baseUrl:string="https://localhost:44301/api/Company"

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('usertoken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`  // Correct header format
      });
    }
  constructor(private http : HttpClient)
  {}

  GetAllCompanies():Observable<ICompany[]>{
    return this.http.get<ICompany[]>(this.baseUrl);
  }
  GetCompanyById(companyId:any):Observable<ICompany>{
    return this.http.get<ICompany>(`${this.baseUrl}/${companyId}`,{headers:this.getHeaders()});
  }
  AddCompany(company:ICompany){
    return this.http.post(this.baseUrl,company,{headers:this.getHeaders()});
  }
  EditCompany(company: ICompany , companyId:any){
    return this.http.put(`${this.baseUrl}/${companyId}`,company,{headers:this.getHeaders()})
  }
  DeleteCompany(companyId:any){
    return this.http.delete(`${this.baseUrl}/${companyId}`,{headers:this.getHeaders()});
  }
}
