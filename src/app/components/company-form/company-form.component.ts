import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ICompany } from '../../Models/icompany';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from '../../Services/company.service';


@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {
  companyForm = new FormGroup({
    name: new FormControl('',[Validators.required,]),
    notes: new FormControl('')
  });

  get getName(){
    return this.companyForm.controls["name"];
  }
  get getNotes(){
    return this.companyForm.controls["notes"];
  }
  clicked:boolean=false;
  companyData:any;
  companyArray:ICompany[]=[];
  unique:boolean=true;
  constructor(private companyService:CompanyService, public router:Router) { 
  }
  ngOnInit(): void {
    this.companyService.GetAllCompanies().subscribe({
      next:(response)=>{
        this.companyArray=response;
      }
    })
  }
  addCompany(e:any){
    e.preventDefault();
    this.clicked = true;
    this.unique =true;
    for (var company of this.companyArray) {
      if(this.getName.value?.toUpperCase() == company.name.toUpperCase()){
        this.unique = false;
        break;
      }
    }
    if(this.companyForm.status === "VALID" && this.unique == true){
      this.companyData = {...this.companyForm.value};
      this.companyService.AddCompany(this.companyData).subscribe({
        next:()=>{
          this.router.navigate(["/manage"])
        }
      });
      
    }
  }

}
