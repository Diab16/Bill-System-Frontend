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
  Message:string ='';
  successMessage: string | null = null; // For storing success message
  isLoading:boolean=false;
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
 
  addCompany(){
    this.isLoading = true;
    if(this.companyForm.status === "VALID"){
      if(this.id == 0 ){
        this.companyData = {...this.companyForm.value};
        this.companyService.AddCompany(this.companyData).subscribe({
          next:()=>{
            this.successMessage = 'Company added successfully!'; // Set success message
            setTimeout(() => {
              this.successMessage = null; // Clear message after 3 seconds
              this.router.navigate(['/manage/allCompanies']); // Navigate to the manage route
            }, 1500);  
          }
          ,error: (error) => {
            console.error('Error fetching form data:', error);
            this.showMessage("Error Adding Company !!!");
          }
        });
      }
      else{
        this.companyData = {...this.companyForm.value,id:this.id};
        this.companyService.EditCompany(this.companyData,this.id).subscribe({
          next:()=>{
            var txt='';
            if (this.oldName != this.companyData.name) {
              txt += `Company Name Changed !, \n`;
            }
            if (this.oldNotes != this.companyData.notes) {
              txt += `Notes Changed ! `;
            }
            if(txt == ''){
              txt += `Nothing Changed !`
            }
            this.successMessage = txt; // Set success message
            setTimeout(() => {
              this.successMessage = null; // Clear message after 3 seconds
              this.router.navigate(['/manage/allCompanies']); // Navigate to the manage route
            }, 1500);  
          },
          error: (error) => {
            console.error('Error fetching form data:', error);
            this.showMessage("Error Editing Company !!!");
          }
            
        });
      }
      
      
    }
    this.isLoading = false;
  }

  showMessage(message: string) {
    this.Message = message;
    setTimeout(() => {
      this.Message =''; 
    }, 2000); 
  }
}


