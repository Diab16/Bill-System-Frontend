import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../Services/company.service';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule ,RouterLink ],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit{
  isLoading:boolean=false;
  companyList:any[] =[];
  typeList: string[] = ['Type 1', 'Type 2', 'Type 3']; 
  unitslist:string[] =["Killo " , "m" ,"Package"]

  AddItemsForm:FormGroup = new FormGroup({
    componeyName: new FormControl(null , [Validators.required]),
    typeName:new FormControl(null , [Validators.required]),
    itemName:new FormControl(null , [Validators.required]),
    sellingPrice:new FormControl(null , [ Validators.required , Validators.min(0)]),
    buyingPrice:new FormControl(null , [ Validators.required , Validators.min(0)] ),
    unit:new FormControl(null,[Validators.required]),
    notes:new FormControl(null)
  },{validators:this.PriceValidation()});
 
   //price custom  validators
    PriceValidation():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sellingPrice = control.get('sellingPrice')?.value;
      const buyingPrice = control.get('buyingPrice')?.value; 
      if(sellingPrice != null && buyingPrice != null) 
      {
        if (buyingPrice >= sellingPrice) {
          return { buyingPriceGreaterOrEqual: true };
        }
      }
    
      return null
   }

  }

  constructor(private companyService:CompanyService) {}
  ngOnInit(): void {
    this.companyService.GetAllCompanies().subscribe({
      next:(response)=>{
        this.companyList = response;
        console.log(response);
        
      }
    });
    console.log(this.companyList);
    
  }

  handelAdditem(AddItemsForm:FormGroup)
  {
   this.isLoading=true; 
   if (AddItemsForm.valid)
  {


    console.log(AddItemsForm.value);
    this.isLoading=false; 
    this.AddItemsForm.reset({
      componeyName: '',
      typeName: '',
      itemName: '',
      sellingPrice: null,
      buyingPrice: null,
      notes: ''
    });
  }

 }

}
