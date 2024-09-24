import { IInvoiceItem } from "./iInvoiceItem";

export interface IInvoice {
    id: number;
    billTotal:number;
    billNumber: number;
    date: Date;
    client:{id:number , name:string};
    percentageDiscount: number;
    paidUp: number;
    invoiceItems:IInvoiceItem[];


}