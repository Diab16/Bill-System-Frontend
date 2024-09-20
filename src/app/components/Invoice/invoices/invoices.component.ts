import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  constructor(private service:InvoiceService , public router:Router ){}
  invoices: any[] = [];
  searchterm: string ='';

  isLoading = false;
  message: string = '';
  ngOnInit(): void {
    
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
    if (confirm('Are you sure you want to delete this item?')) {
      this.isLoading = true;
      this.service.DeleteInvoice(id).subscribe({
        next: (response) => {
          console.log(response);
          this.message = 'Item deleted successfully';
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.message = 'Error deleting item';
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
