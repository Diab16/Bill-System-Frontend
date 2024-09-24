import { IInvoiceItem } from "./iInvoiceItem";

export interface IInvoice {
    id: number;
    billTotal:number;
    billNumber: number;
    date: Date;
    clientId: number;
    percentageDiscount: number;
    paidUp: number;
    invoiceItems:IInvoiceItem[];


}