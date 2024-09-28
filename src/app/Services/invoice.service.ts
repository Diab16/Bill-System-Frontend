import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from '../Interfaces/iInvoice';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

 // baseUrl: string = "https://localhost:7200/api/SalesInvoice";
  baseUrl: string = "https://localhost:44301/api/SalesInvoice";
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('usertoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Correct header format
    });
  }
    constructor(private http: HttpClient) { }
  
    GetAllInvoices(): Observable<IInvoice[]> {
      return this.http.get<IInvoice[]>(this.baseUrl);
    }
    AddInvoice(Invoice: IInvoice): Observable<any> {
      return this.http.post(this.baseUrl, Invoice,{headers:this.getHeaders()});
    }
    GetInvoiceById(InvoiceId: any) {
    return this.http.get<IInvoice>(`${this.baseUrl}/${InvoiceId}`,{headers:this.getHeaders()});
    }
    EditInvoice(Invoice: IInvoice, InvoiceId: any) {
      return this.http.put(`${this.baseUrl}/${InvoiceId}`, Invoice,{headers:this.getHeaders()});
    }
    DeleteInvoice(InvoiceId: any) {
      return this.http.delete(`${this.baseUrl}/${InvoiceId}`,{headers:this.getHeaders()});
    }
}
