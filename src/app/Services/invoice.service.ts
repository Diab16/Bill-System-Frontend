import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from '../Interfaces/iInvoice';
import {IDateRange} from '../Interfaces/idate-range'


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl: string = "https://localhost:7200/api/SalesInvoice";
  reportUrl:string="https://localhost:7200/api/Reports"
 // baseUrl: string = "https://localhost:44301/api/SalesInvoice";

    constructor(private http: HttpClient) { }
  
    GetAllInvoices(): Observable<IInvoice[]> {
      return this.http.get<IInvoice[]>(this.baseUrl);
    }
    AddInvoice(Invoice: IInvoice): Observable<any> {
      return this.http.post(this.baseUrl, Invoice);
    }
    GetInvoiceById(InvoiceId: any) {
    return this.http.get<IInvoice>(`${this.baseUrl}/${InvoiceId}`);
    }
    EditInvoice(Invoice: IInvoice, InvoiceId: any) {
      return this.http.put(`${this.baseUrl}/${InvoiceId}`, Invoice);
    }
    DeleteInvoice(InvoiceId: any) {
      return this.http.delete(`${this.baseUrl}/${InvoiceId}`);
    }
    InvoiceReport(dateRange: IDateRange): Observable<any> {
      return this.http.post(`${this.reportUrl}/invoice`,dateRange );
    }
    StorageReport():Observable<any>{
      return this.http.get(`${this.reportUrl}/storage`)
    }
}
