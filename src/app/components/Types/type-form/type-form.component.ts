import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IType } from '../../../Models/iType';
import { TypeService } from '../../../Services/type.service';
import { CompanyService } from '../../../Services/company.service';
import { CommonModule } from '@angular/common';
import { Observable, of, map, catchError } from 'rxjs';

@Component({
  selector: 'app-type-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {
  typeId: number = 0;
  TypeArray: IType[] = [];
  companyArray: any[] = []; // Array to store the list of companies
  successMessage: string | null = null; // For storing success message
  isLoading:boolean=false;

  // Initialize the form group with default values
  TypeForm = new FormGroup({
    companyName: new FormControl('',{validators: [Validators.required]}),
    name: new FormControl('', {validators:[Validators.required]}),
    notes: new FormControl('')
  },{validators:[this.chooseCompanyFirst()],asyncValidators:this.uniqueTypeNameValidator(),updateOn:'change'});
  uniqueTypeNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {      
      if (!control.value) {
        return of(null); 
      }

      return this.typeService.GetTypeByCompanyName(this.getCompanyName.value).pipe(
        map(types => {
          this.TypeArray = types; 
               
          const typeNameExists = this.TypeArray.some(t => t.typeName.toUpperCase() === this.getName.value?.toUpperCase() && t.typeId != this.typeId);
          
          
          return typeNameExists ? { uniqueTypeName: true } : null;
        }),
        catchError(() => of(null)) 
      );
    };
  }
  chooseCompanyFirst(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const compName = control.get('companyName')?.value;
      if( compName == ''){
        return {chooseCompanyFirst: true} ;
      }
      return null;
    };
  }


  constructor(
    private typeService: TypeService,
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    // Initialize typeId from the route parameters
    this.typeId = Number(this.activatedRoute.snapshot.params['id']) || 0;

    //this.TypeForm.get('companyName')?.valueChanges.subscribe(() => this.companyChange());
    if (this.typeId) {
      // Edit mode
      this.typeService.GetTypeById(this.typeId).subscribe({
        next: (response) => {
          this.TypeForm.setValue({
            companyName: response.companyName,
            name: response.typeName,
            notes: response.typeNotes || ''
          });
        },
        error: (err) => {
          console.error('Error fetching type for editing:', err);
        }
      });
    }
    // Load all companies
 
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.GetAllCompanies().subscribe({
      next: (response) => {
        this.companyArray = response; // Populate companyArray with the list of companies
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  get getCompanyName() {
    return this.TypeForm.controls['companyName'];
  }

  get getName() {
    return this.TypeForm.controls['name'];
  }

  get getNotes() {
    return this.TypeForm.controls['notes'];
  }

  addType(e: Event) {
    e.preventDefault(); // Prevent default form submission behavior

    this.isLoading = true;
    if (isNaN(this.typeId) || this.typeId == null) {
      this.typeId = 0; // Set to 0 if it wasn't properly initialized
    }

    // If the form is valid and the type name is unique
    if (this.TypeForm.valid ) {
      const typeData: IType = {
        typeId: this.typeId, // Use the updated or existing typeId
        typeName: this.getName.value || '', // Ensure value is a string
        typeNotes: this.getNotes.value || '', // Ensure value is a string
        companyName: this.getCompanyName.value || '' // Ensure value is a string
      };

      if (this.typeId) {
        // Edit type
        this.typeService.EditType(typeData, this.typeId).subscribe({
          next: () => {
            this.successMessage = 'Type updated successfully!';
            setTimeout(() => {
              this.router.navigate(['/manage/Type']);
            }, 2000); // Redirect after 2 seconds
          },
          error: (err) => {
            console.error('Error updating type:', err);
          }
        });
      } else {
        // Add new type
        this.typeService.AddType(typeData).subscribe({
          next: () => {
            this.successMessage = 'Type added successfully!';
            setTimeout(() => {
              this.router.navigate(['/manage/Type']);
            }, 2000); // Redirect after 2 seconds
          },
          error: (err) => {
            console.error('Error adding type:', err);
          }
        });
      }
    }
    setTimeout(() => {
      this.isLoading = false;    
    }, 2000);
    
  }
}
