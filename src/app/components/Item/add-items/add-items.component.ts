import { Iitems } from '../../../Interfaces/Iitems';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ItemsServiceService } from '../../../Services/items-service.service';
import { IFormdata } from '../../../Interfaces/Iformdata';
import { catchError, map, Observable, of } from 'rxjs';
import { TypeService } from '../../../Services/type.service';

@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule ,RouterLink ],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit {
   Message:string ='';
  isLoading:boolean=false;
  formdata!: IFormdata; 
  itemms:Iitems[] = [];
  companyList: { id: number; name: string }[] = []; 
  typeList: { id: number; name: string }[] = []; 
  unitsList: { id: number; name: string }[] = []; 
  successMessage: string | null = null; // For storing success message

  constructor( private service:ItemsServiceService , public router:Router,private typeService:TypeService){}
  AddItemsForm:FormGroup = new FormGroup({
    companyId: new FormControl("" , [Validators.required]),
    typeId:new FormControl('' , [Validators.required,]),
    name: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.uniqueItemNameValidator()],
      updateOn: 'change' 
    }),
    sellingPrice:new FormControl(null , [ Validators.required , Validators.min(0)]),
    buyingPrice:new FormControl(null , [ Validators.required , Validators.min(0)] ),
    availableAmount:new FormControl(null , [ Validators.required , Validators.min(0)] ),
    unitId:new FormControl('',[Validators.required]),
    notes:new FormControl('')
  },{validators:[this.PriceValidation(),this.chooseCompanyFirst()]} );

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
  //Choose Company First
  chooseCompanyFirst(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const compId = control.get('companyId')?.value;
      if( compId == ''){
        return {chooseCompanyFirst: true} ;
      }
      return null;
    };
  }
   //unique VValidator
  uniqueItemNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); 
      }

      return this.service.getAllItems().pipe(
        map(items => {
          this.itemms = items; 
          const itemNameExists = this.itemms.some(item => item.name.toLowerCase() === control.value.toLowerCase());
          return itemNameExists ? { uniqueItemName: true } : null;
        }),
        catchError(() => of(null)) 
      );
    };
  }

  ngOnInit(): void {
    this.AddItemsForm.get('companyId')?.valueChanges.subscribe(() => this.getCompanyTypes());
    this.service.getFormData().subscribe({
      next: (response) => {
        this.formdata = response;
        this.companyList = this.formdata.companies;
        //this.typeList = this.formdata.types;
        this.unitsList = this.formdata.units;
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
      }
    });
  }
  getCompanyTypes(){
    this.typeList = [];
    const companyName = this.companyList.find(c=>c.id == this.AddItemsForm.get('companyId')?.value)?.name;
    console.log(companyName);
    
    this.typeService.GetTypeByCompanyName(companyName).subscribe({
      next:(response)=>{
        for (var type of response) {
          var mappedType = {
            id:type.typeId,
            name:type.typeName
          }
          this.typeList.push(mappedType);
        }
        console.log(this.typeList);
        
      }
    })
  }


  handelAdditem(AddItemsForm:FormGroup)
  {
   this.isLoading=true; 
   if (AddItemsForm.valid)
  {
    console.log(AddItemsForm.value);
    this.service.AddItem(AddItemsForm.value).subscribe({
      next:(res)=>
      {
         console.log(res)
         this.successMessage = 'Item added successfully!'; // Set success message
         setTimeout(() => {
           this.successMessage = null; // Clear message after 3 seconds
           this.router.navigate(['/manage/Items']); // Navigate to the manage route
         }, 1500);
      } , error: (error) => {
        console.error('Error fetching form data:', error);
      }
    })
    this.isLoading=false; 
    this.AddItemsForm.reset({
      companyId: '',
      name:'',
      typeId: '',
      sellingPrice: null,
      buyingPrice: null,
      unitId:'',
      availableAmount:null,
      notes:''
    });

  }

 }


}
