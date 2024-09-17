import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-units',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'] 
})
export class UnitsComponent {
  unitForm: FormGroup;
  existingUnitNames: string[] = ['Unit1', 'Unit2', 'Unit3']; 
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.unitForm = this.formBuilder.group({
      unitName: ['', [Validators.required, this.unitNameUniqueValidator.bind(this)]],
      notes: ['']
    });
  }

  unitNameUniqueValidator(control: any) {
    if (this.existingUnitNames.includes(control.value)) {
      return { unitNameExists: true };
    }
    return null;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.unitForm.valid) {
      console.log('Form Submitted', this.unitForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['/']); 
  }
  get unitName() {
    return this.unitForm.get('unitName');
  }
  get notes() {
    return this.unitForm.get('notes');
  }
}
