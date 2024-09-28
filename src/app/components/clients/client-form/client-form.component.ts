import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IClient } from '../../../Models/iclient';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ClientService } from '../../../Services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  id: number = 0;
  Message: string = '';
  successMessage: string | null = null;
  isLoading: boolean = false;

  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    phone: new FormControl('', [Validators.required, this.phoneValidator()]) 
  }, { validators: this.uniqueValidation() });

  clientData: IClient | null = null;
  clientArray: IClient[] = [];

  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => this.clientArray = clients,
      error: (error) => console.error('Error fetching clients:', error)
    });

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0', 10);
    if (this.id) {
      this.clientService.getClient(this.id).subscribe({
        next: (client) => this.clientForm.patchValue(client),
        error: (error) => console.error('Error fetching client:', error)
      });
    }
  }

  //phone validator to be exactly 11 digits
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneValue = control.value;
      const phonePattern = /^\d{11}$/; 
      return phonePattern.test(phoneValue) ? null : { invalidPhone: true };
    };
  }

  // unique name with case sensitivity
  uniqueValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.clientArray) {
        return null;
      }
      const clientName = control.get('name')?.value?.toLowerCase(); 
      const existingClient = this.clientArray.find(client => client.name.toLowerCase() === clientName);
      return existingClient && existingClient.id !== this.id ? { uniqueName: true } : null;
    };
  }

  submitForm(event: Event): void {
    event.preventDefault();
    if (this.clientForm.invalid) return;

    this.isLoading = true;
    const clientData: IClient = {
      id: this.id || 0,
      name: this.clientForm.get('name')?.value ?? '',
      address: this.clientForm.get('address')?.value ?? '',
      phone: this.clientForm.get('phone')?.value ?? ''
    };

    if (this.id === 0) {
      this.clientService.addClient(clientData).subscribe({
        next: () => {
          this.successMessage = 'Client Added Successfully';
          setTimeout(()=>{
            this.successMessage = null;
            this.isLoading = false;
            this.router.navigate(['/manage/allClients']);
          },2000);
          
        },
        error: () => {
          this.Message = 'Error Occurred';
          this.isLoading = false;
        }
      });
    } else {
      this.clientService.updateClient(this.id, clientData).subscribe({
        next: () => {
          this.successMessage = 'Client Edited Successfully';
          setTimeout(()=>{
            this.successMessage = null;
            this.isLoading = false;
            this.router.navigate(['/manage/allClients']);
          },2000);
        },
        error: () => {
          this.Message = 'Error Occurred';
          this.isLoading = false;
        }
      });
    }
  }
  
  hoverIn() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    if (btn1 && btn2) {
      btn1.style.display = "none";
      btn2.style.display = "block";
    }
  }
  hoverOut() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    if (btn1 && btn2) {
      btn1.style.display = "block";
      btn2.style.display = "none";
    }
  }
}
