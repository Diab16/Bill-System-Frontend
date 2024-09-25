import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { InvoiceService } from '../../../Services/invoice.service';
@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule ,RouterLink , NgFor],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent implements OnInit {
  id:any;
  Invoice:any;

  constructor(private activatedRoute : ActivatedRoute , 
              private Service : InvoiceService) 
  {   
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.Service.GetInvoiceById(this.id).subscribe({
      next:(resp)=>{
        this.Invoice = resp;
        console.log(this.Invoice);
        
      }
    })
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
