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

  constructor(private activatedRoute : ActivatedRoute , private companyService : CompanyService) 
  {   
  }
  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.url[3]);
    this.companyService.GetCompanyById(this.id).subscribe({
      next:(response)=>{
        this.company = response;
      }
    })
  }


}
