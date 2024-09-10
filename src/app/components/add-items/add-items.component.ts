import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule ,RouterLink ],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent {
  isLoading:boolean=false;
  companyList:any[] =["company2" , "componey2"]
  typeList: string[] = ['Type 1', 'Type 2', 'Type 3']; // Example types

  AddItemsForm:FormGroup = new FormGroup({
    componeyName: new FormControl(null , [Validators.required]),
    typeName:new FormControl(null , [Validators.required]),
    itemName:new FormControl(null , [Validators.required]),
    sellingPrice:new FormControl(null , [ Validators.required , Validators.min(0)]),
    buyingPrice:new FormControl(null , [ Validators.required , Validators.min(0)] ),
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
