import { Pipe, PipeTransform } from '@angular/core';
import { IInvoice } from './Interfaces/iInvoice';

@Pipe({
  name: 'searchBillNum',
  standalone: true
})
export class SearchBillNumPipe implements PipeTransform {

  transform(invoices:IInvoice[],serchterm:string): any[] {
    return invoices.filter((invoice)=> invoice.billNumber.toString().includes(serchterm));
  }

}
