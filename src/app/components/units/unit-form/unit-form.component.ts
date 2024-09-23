import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUnit } from '../../../Models/iunit';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UnitService } from '../../../Services/unit.service';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css']
})
export class UnitFormComponent implements OnInit {
  id: number = 0;  
  Message: string = '';
  successMessage: string | null = null; 
  isLoading: boolean = false;
  
  unitForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    notes: new FormControl('')
  }, { validators: this.uniqueValidation() });

  unitData: IUnit | null = null;
  unitArray: IUnit[] = [];

  constructor(private unitService: UnitService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.unitService.getUnits().subscribe({
      next: (response) => {
        this.unitArray = response;
      },
      error: (error) => {
        console.error('Error fetching units:', error);
      }
    });

    // Retrieve the id from the route. If id is 0 or not present, it's an "Add" operation
    this.id = Number(this.activatedRoute.snapshot.params['id']) || 0;

    // If the id is not 0, load the existing unit details for editing
    if (this.id !== 0) {
      this.unitService.getUnit(this.id).subscribe({
        next: (response) => {
          this.unitData = response;
          this.unitForm.patchValue({
            name: this.unitData.name,
            notes: this.unitData.notes
          });
        },
        error: (error) => {
          console.error('Error loading unit details:', error);
        }
      });
    }
  }

  uniqueValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const unitName = control.get('name')?.value;
      if (unitName && this.unitArray) {
        for (const unit of this.unitArray) {
          if (unitName.toUpperCase() === unit.name.toUpperCase() && this.id !== unit.id) {
            return { uniqueName: true };
          }
        }
      }
      return null;
    };
  }

  submitForm(e: Event): void {
    e.preventDefault();
  
    if (this.unitForm.valid) {
      this.isLoading = true;
  
      // Map form values to ensure they're non-null
      const unitPayload: IUnit = {
        id: this.id !== 0 ? this.id : 0, 
        name: this.unitForm.get('name')?.value ?? '', 
        notes: this.unitForm.get('notes')?.value ?? ''
      };
  
      if (this.id === 0) {
        this.unitService.addUnit(unitPayload).subscribe({
          next: () => {
            this.successMessage = 'Unit added successfully!';
            this.redirectToUnitList();
          },
          error: (error) => {
            console.error('Error adding unit:', error);
            this.showMessage('Error Adding Unit!');
          }
        });
      } else {
        this.unitService.updateUnit(this.id, unitPayload).subscribe({
          next: () => {
            this.successMessage = 'Unit updated successfully!';
            this.redirectToUnitList();
          },
          error: (error) => {
            console.error('Error updating unit:', error);
            this.showMessage('Error Editing Unit!');
          }
        });
      }
      this.isLoading = false;
    }
  }

  showMessage(message: string): void {
    this.Message = message;
    setTimeout(() => {
      this.Message = '';
    }, 2000);
  }

  redirectToUnitList(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.router.navigate(['/manage/allUnits']);
    }, 1500);
  }

  get getName() {
    return this.unitForm.controls['name'];
  }

  get getNotes() {
    return this.unitForm.controls['notes'];
  }
}
