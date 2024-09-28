import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],  
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clientForm: FormGroup;
  existingClientNames: string[] = ['Client1', 'Client2', 'Client3']; //clients for test
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.clientForm = this.formBuilder.group({
      clientName: ['', [Validators.required, this.clientNameUniqueValidator.bind(this)]],
      clientPhone: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      clientNumber: [{ value: this.generateClientNumber(), disabled: true }], // Auto-generated and disabled
      clientAddress: ['', Validators.required]
    });
  }

  clientNameUniqueValidator(control: any) {
    if (this.existingClientNames.includes(control.value)) {
      return { clientNameExists: true };
    }
    return null;
  }

  generateClientNumber(): number {
    return Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.clientForm.valid) {
      console.log('Form Submitted', this.clientForm.value);
    }
  }


  get clientName() {
    return this.clientForm.get('clientName');
  }
  get clientPhone() {
    return this.clientForm.get('clientPhone');
  }
  get clientAddress() {
    return this.clientForm.get('clientAddress');
  }
}
// or

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common'; 

// @Component({
//   selector: 'app-clients',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],  
//   templateUrl: './clients.component.html',
//   styleUrl: './clients.component.css'
// })
// export class ClientsComponent {
//   clientForm: FormGroup;
//   existingClientNames: string[] = ['Client1', 'Client2', 'Client3']; //clients for test
//   formSubmitted: boolean = false;

//   constructor(private formBuilder: FormBuilder, private router: Router) {
//     this.clientForm = this.formBuilder.group({
//       clientName: ['', [Validators.required, this.clientNameUniqueValidator.bind(this)]],
//       clientPhone: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
//       clientNumber: [{ value: '', disabled: true }], // Set disabled here
//       clientAddress: ['', Validators.required]
//     });
//   }

//   clientNameUniqueValidator(control: any) {
//     if (this.existingClientNames.includes(control.value)) {
//       return { clientNameExists: true };
//     }
//     return null;
//   }

//   generateClientNumber(): number {
//     return Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
//   }

//   onSubmit() {
//     this.formSubmitted = true;
//     if (this.clientForm.valid) {
//       console.log('Form Submitted', this.clientForm.value);
//     }
//   }

//   onCancel() {
//     this.router.navigate(['/']); 
//   }
//   get clientName() {
//     return this.clientForm.get('clientName');
//   }
//   get clientPhone() {
//     return this.clientForm.get('clientPhone');
//   }
//   get clientAddress() {
//     return this.clientForm.get('clientAddress');
//   }
// }
