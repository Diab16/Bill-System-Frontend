import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICompany } from '../../../Models/icompany';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CompanyService } from '../../../Services/company.service';


@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {
  id:any;
  companyForm = new FormGroup({
    name: new FormControl('',[Validators.required,]),
    notes: new FormControl('')
  },{validators : this.UniqueValidation()});

  UniqueValidation():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const companyName = control.get('name')?.value;
      if(companyName != null && this.companyArray != null) 
      {
        for (var company of this.companyArray) {
          if(companyName.toUpperCase() == company.name.toUpperCase() && this.id != company.id){
            return { uniqueName: true };
          }
        }
      }
      return null
   }
  }

  get getName(){
    return this.companyForm.controls["name"];
  }
  get getNotes(){
    return this.companyForm.controls["notes"];
  }
  clicked:boolean=false;
  oldName:string='';
  oldNotes:string='';
  companyData:any;
  companyArray:ICompany[]=[];
  unique:boolean=true;
  constructor(private companyService:CompanyService, public router:Router , private activatedRoute : ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.companyService.GetAllCompanies().subscribe({
      next:(response)=>{
        this.companyArray=response;
      }
    });
    this.id = Number(this.activatedRoute.snapshot.url[3].path);
    if(this.id != 0){
      this.companyService.GetCompanyById(this.id).subscribe({
        next:(response)=>{
          this.oldName = response.name;
          this.oldNotes = response.notes;
          this.getName.setValue(response.name);
          this.getNotes.setValue(response.notes);
        }
      })
    }
    
  }
 
  addCompany(e:any){
    e.preventDefault();
    this.clicked = true;
    if(this.companyForm.status === "VALID"){
      if(this.id == 0 ){
        this.companyData = {...this.companyForm.value};
        this.companyService.AddCompany(this.companyData).subscribe({
          next:()=>{
            alert(`Company ' ${this.companyData.name} ' Added Successfully !`);
            this.router.navigate(["/manage/allCompanies"])
          }
        });
      }
      else{
        this.companyData = {...this.companyForm.value,id:this.id};
        this.companyService.EditCompany(this.companyData,this.id).subscribe({
          next:()=>{
            var txt='';
            if (this.oldName != this.companyData.name) {
              txt += `Company ( ${this.oldName} ) is Edited to ( ${this.companyData.name} ) Successfully !, \n`;
            }
            if (this.oldNotes != this.companyData.notes) {
              txt += `Notes Changed ! `;
            }
            if(txt == ''){
              txt += `Nothing Changed !`
            }
            alert(txt);
            
            this.router.navigate(["/manage/allCompanies"])
          }
        });
      }
      
      
    }
  }

}
function UniqueValidation() {
  throw new Error('Function not implemented.');
}

