import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CompanyService } from '../../../Services/company.service';
import { ICompany } from '../../../Models/icompany';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.css'
})
export class AllCompaniesComponent {
  companies : ICompany[]=[];
  constructor(private companyService : CompanyService , private router : Router, private activatedRoute : ActivatedRoute){}
  ngOnInit(): void {
    this.companyService.GetAllCompanies().subscribe({
      next:(response)=>{
        this.companies = response;
      }
    });

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
  deleteCompany(companyId:any){
    this.companyService.DeleteCompany(companyId).subscribe({
      next:()=>{
        this.companies = this.companies.filter(c => c.id != companyId);
      }
    });
    
  }
}
