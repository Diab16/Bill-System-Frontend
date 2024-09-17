import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private typeService: TypeService, private companyService: CompanyService, public router: Router) { }

  ngOnInit(): void {
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
    this.clicked = true; // Set state to indicate that a submission attempt has been made
    this.unique = true; // Assume the type is unique initially

    // Check if the type name is unique
    for (const type of this.TypeArray) {
      if (this.getName.value?.toUpperCase() === type.typeName.toUpperCase()) {
        this.unique = false; // Type name is not unique
        break;
      }
    }

    // Log the form validity and type uniqueness
    console.log('Form Status:', this.TypeForm.status);
    console.log('Type Name Unique:', this.unique);

    // If the form is valid and the type name is unique
    if (this.TypeForm.valid && this.unique) {
      const typeData: IType = {
        typeName: this.getName.value || '', // Ensure value is a string
        typeNotes: this.getNotes.value || '', // Ensure value is a string
        companyName: this.getCompanyName.value || '' // Ensure value is a string
      };

      // Log the data being sent
      console.log('Type Data:', typeData);

      this.typeService.AddType(typeData).subscribe({
        next: () => {
          this.successMessage = 'Type added successfully!'; // Set success message
          setTimeout(() => {
            this.successMessage = null; // Clear message after 3 seconds
            this.router.navigate(['/manage']); // Navigate to the manage route
          }, 3000); // Show message for 3 seconds
        },
        error: (err) => {
          console.error('Error adding type:', err); // Log errors if any
        }
      });
    }
  }
}
