import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IType } from '../../Models/iType';
import { TypeService } from '../../Services/type.service';
import { CompanyService } from '../../Services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {
  typeId: number = 0;
  TypeForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    notes: new FormControl('')
  });

  get getCompanyName() {
    return this.TypeForm.controls['companyName'];
  }

  get getName() {
    return this.TypeForm.controls['name'];
  }

  get getNotes() {
    return this.TypeForm.controls['notes'];
  }

  clicked: boolean = false;
  TypeArray: IType[] = [];
  companyArray: any[] = []; // Array to store the list of companies
  unique: boolean = true;
  successMessage: string | null = null; // For storing success message

  constructor(private typeService: TypeService, private companyService: CompanyService, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.typeId = Number(this.activatedRoute.snapshot.params['id']);

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

    this.typeService.GetAllTypes().subscribe({
      next: (response) => {
        this.TypeArray = response;
      },
      error: (err) => {
        console.error('Error fetching types:', err);
      }
    });

    // Load companies for the dropdown
    this.companyService.GetAllCompanies().subscribe({
      next: (response) => {
        this.companyArray = response; // Populate companyArray with the list of companies
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  addType(e: any) {
  e.preventDefault(); // Prevent default form submission behavior

  if (isNaN(this.typeId) || this.typeId == null) {
      this.typeId = 0; // Set to 0 if it wasn't properly initialized
  }

  this.clicked = true; // Set state to indicate that a submission attempt has been made
  this.unique = true; // Assume the type is unique initially

 // Check if the type name is unique only if adding a new type
  if (this.typeId === 0) {
      this.unique = !this.TypeArray.some(type =>
      this.getName.value?.toUpperCase() === type.typeName.toUpperCase()
    );
  }

  // Log the form validity and type uniqueness
  console.log('Form Status:', this.TypeForm.status);
  console.log('Type Name Unique:', this.unique);

  // If the form is valid and the type name is unique
  if (this.TypeForm.valid && this.unique) {
    const typeData: IType = {
      typeId: this.typeId, // Use the updated or existing typeId
      typeName: this.getName.value || '', // Ensure value is a string
      typeNotes: this.getNotes.value || '', // Ensure value is a string
      companyName: this.getCompanyName.value || '' // Ensure value is a string
    };

    // Log the data being sent
    console.log('Type Data:', typeData);

    if (this.typeId) {
      // Edit type
      this.typeService.EditType(typeData, this.typeId).subscribe({
        next: () => {
          this.successMessage = 'Type updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/Type']);
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
            this.router.navigate(['/Type']);
          }, 2000); // Redirect after 2 seconds
        },
        error: (err) => {
          console.error('Error adding type:', err);
        }
      });
    }
  } else {
    // Log validation errors
    console.log('Form errors:', this.TypeForm.errors);
    console.log('Type Name Not Unique:', !this.unique);
  }
}

}
