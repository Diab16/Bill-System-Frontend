import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICompany } from '../../../Models/icompany';
import { CompanyService } from '../../../Services/company.service';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {
  id:any;
  company:any;

  constructor(private activatedRoute : ActivatedRoute , private Service : CompanyService) 
  {   
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Service.GetCompanyById(this.id).subscribe({
      next:(resp)=>{
        this.company = resp;
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
