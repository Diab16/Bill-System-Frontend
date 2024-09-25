import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ItemsServiceService } from '../../../Services/items-service.service';
import { Component, OnInit } from '@angular/core';
import { IFormdata } from '../../../Interfaces/Iformdata';
import { Iitems } from '../../../Interfaces/Iitems';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TypeService } from '../../../Services/type.service';

@Component({
  selector: 'app-edit-items',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule,RouterLink ],
  templateUrl: './edit-items.component.html',
  styleUrl: './edit-items.component.css'
})
export class EditItemsComponent  implements OnInit{

  Message:string =''
  isLoading:boolean=false;
  formdata!: IFormdata; 
  itemms!:Iitems;
  itemid:any; 
  companyList: { id: number; name: string  ,types:{id:number , name:string}[] }[] = []; 
  typeList: { id: number; name: string }[] = []; 
  unitsList: { id: number; name: string }[] = []; 
  EditItemsForm: FormGroup = new FormGroup({});
  successMessage: string | null = null; // For storing success message
  cnt:number =0;

  constructor(private service:ItemsServiceService , public route:ActivatedRoute  , public router:Router,private typeService:TypeService){}



  ngOnInit(): void {
    this.itemid = +this.route.snapshot.paramMap.get('id')!;
    this.EditItemsForm = new FormGroup({
      id: new FormControl(null),  // Hidden field
      companyId: new FormControl(null, [Validators.required]),
      typeId: new FormControl( [Validators.required]),
      name: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueItemNameValidator(this.itemid)],
        updateOn: 'blur'
      }),
      sellingPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
      buyingPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
      availableAmount: new FormControl(null, [Validators.required, Validators.min(0)]),
      unitId: new FormControl(null, [Validators.required]),
      notes: new FormControl('')
    }, { validators: this.PriceValidation() });
    this.EditItemsForm.get('companyId')?.valueChanges.subscribe(() => this.getCompanyTypes(this.EditItemsForm.get('companyId')?.value));

  
    this.loadFormData();
    
  }
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
   //unique VValidator
   uniqueItemNameValidator(itemId?: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); 
      }
  
      return this.service.getAllItems().pipe(
        map(items => {
          // Convert item names and control value to lowercase for case-insensitive comparison
          const normalizedControlValue = control.value.toLowerCase();
          const itemNameExists = items.some(item => 
            item.name.toLowerCase() === normalizedControlValue && item.id !== itemId
          );
          console.log('Unique validation result:', { controlValue: normalizedControlValue, itemNameExists });
  
          return itemNameExists ? { uniqueItemName: true } : null;
        }),
        catchError(() => of(null)) 
      );
    };
  }
  
  getCompanyTypes(id:any){
    this.typeList = [];
    const companyName = this.companyList.find(c=>c.id == id)?.name;
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
        if (this.cnt > 0) {
          this.EditItemsForm.get('typeId')?.reset('');
        }
        this.cnt++;
        
      }
    })
  }

  loadFormData() {
    this.service.getFormData().subscribe({
      next: (formData) => {
        this.companyList = formData.companies;
        //this.typeList = formData.types;
        this.unitsList = formData.units;
  
        if (this.itemid) {
          this.service.getById(this.itemid).subscribe({
            next: (item: Iitems) => {
              this.itemms = item;
              //this.getCompanyTypes(item.companyId);
              this.EditItemsForm.patchValue(item);
            },
            error: (error) => {
              console.error('Error fetching item data:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching form data:', error);
      }
    });
  }
  
  
  










  handelEdititem() {
    this.isLoading = true;

        
    if (this.EditItemsForm.valid) {
      if (this.itemid) {
        console.log(this.EditItemsForm.value);
        this.service.editItem(this.EditItemsForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.Message = 'Item Updated Successfully';
            this.successMessage = 'Item Edited successfully!'; // Set success message
            setTimeout(() => {
              this.successMessage = null; // Clear message after 3 seconds
              this.router.navigate(['/manage/Items']); // Redirect to items page // Navigate to the manage route
            }, 1500);
           

          },
          error: (error) => {
            console.error('Error updating item:', error);
            this.Message = 'Error Updating Item';
          },
          complete: () => {
            this.isLoading = false; // Ensure isLoading is set to false after the request completes
          }
        });
      } else {
        this.Message = 'Item ID is missing';
        this.isLoading = false; // Ensure isLoading is set to false if no item ID is provided
      }
    } else {
      this.Message = 'Form is not valid';
      this.isLoading = false;
    }

  }

  
}
