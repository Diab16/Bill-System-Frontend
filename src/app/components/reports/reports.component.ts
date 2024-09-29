import { IDateRange } from './../../Interfaces/idate-range';
import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InvoiceService } from '../../Services/invoice.service';
import { IInvoice } from '../../Interfaces/iInvoice';
import { SearchBillNumPipe } from '../../search-bill-num.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink ,CommonModule ,SearchBillNumPipe ,FormsModule,DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  providers: [DatePipe]
})
export class ReportsComponent implements OnInit{
  constructor(private service:InvoiceService,private datePipe: DatePipe , public router:Router , private activatedRoute:ActivatedRoute){}
  invoices: any[] = [];
  items:any[]=[];
  searchterm: string ='';
  url:string="";
  isLoading = false;
  successMessage: string | null = null; // For storing success message
  theDateRange:IDateRange={first:"27-9-2024",last:"28-9-2024"}

  ngOnInit(): void {
    this.url = this.activatedRoute.snapshot.url[0].path;
    
    this.loadItems();
  }
  loadItems() {
    this.service.StorageReport().subscribe({
      next: (response) =>{
        console.log(response);
        this.items=response;       
      } ,
      error: (error) => console.error('Error loading Invoice:', error)
    });
  }
  onSubmit(){
    this.invoices=[];
    this.theDateRange.first=this.datePipe.transform(this.theDateRange.first, 'dd-MM-yyyy') || "";
    this.theDateRange.last=this.datePipe.transform(this.theDateRange.last, 'dd-MM-yyyy') || "";
    console.log(this.theDateRange);
    this.service.InvoiceReport(this.theDateRange).subscribe({
      next: (response) =>{
        console.log(response);  
        this.invoices=response;     
        this.theDateRange.first="";
        this.theDateRange.last="";
      } ,
      error: (error) => console.error('Error loading Invoice:', error)
    });
  }
}
