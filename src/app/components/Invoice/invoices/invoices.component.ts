import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InvoiceService } from '../../../Services/invoice.service';
import { IInvoice } from '../../../Interfaces/iInvoice';
import { SearchBillNumPipe } from '../../../search-bill-num.pipe';


@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [RouterLink ,CommonModule ,SearchBillNumPipe ,FormsModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  constructor(private service:InvoiceService , public router:Router , private activatedRoute:ActivatedRoute){}
  invoices: any[] = [];
  searchterm: string ='';

  url:string="";
  isLoading = false;
  successMessage: string | null = null; // For storing success message

  ngOnInit(): void {
    this.url = this.activatedRoute.snapshot.url[0].path;
    
    this.loadItems();

  }


  loadItems() {
    this.service.GetAllInvoices().subscribe({
      next: (response) =>{
        console.log(response);       
        this.invoices = response;
      } ,
      error: (error) => console.error('Error loading items:', error)
    });
  }

  Delete(id: number) {
    if (confirm('Are you sure you want to delete this Invoice?')) {
      this.isLoading = true;
      this.service.DeleteInvoice(id).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Invoice deleted Successfully!';
          setTimeout(() => {
            this.successMessage=null;
          }, 2000);

        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.successMessage = 'Error deleting item';
          setTimeout(() => {
            this.successMessage=null;
          }, 2000);
        },
        complete: () => {
          this.isLoading = false;
          this.loadItems();
        }
      });
    }
  }

  hoverIn(){
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    if(btn1 && btn2){
      btn1.style.display ="none";
      btn2.style.display ="block";
    }
  }
  hoverOut(){
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    if(btn1 && btn2){
      btn1.style.display ="block";
      btn2.style.display ="none";
    }
  }
}
