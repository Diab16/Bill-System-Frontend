import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CompanyService } from '../../../Services/company.service';
import { ICompany } from '../../../Models/icompany';
import { NONE_TYPE } from '@angular/compiler';
import { SearchPipePipe } from '../../../search-pipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,SearchPipePipe,FormsModule],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.css'
})
export class AllCompaniesComponent {
  companies : ICompany[]=[];
  searchterm: string ='';
  successMessage:string|null=null;
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
    if (confirm('Are you sure you want to delete this item?')) {
      this.companyService.DeleteCompany(companyId).subscribe({
        next:()=>{
          this.successMessage = "Company Deleted Successfully";
          setTimeout(()=>{
            this.successMessage = null;          
            this.companies = this.companies.filter(c => c.id != companyId);
          },2000)
        }
      });
    }
    
    
  }
}
