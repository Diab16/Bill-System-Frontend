import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ItemsComponent } from '../Item/items/items.component';
import { ItemsServiceService } from '../../Services/items-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,RouterModule , ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _auth:ItemsServiceService , private _router:Router){}
  isLoading:boolean=false;
  ApiError:string='';
  header:any;
  payload:any;
  encodedHeader:any;
  encodedPayload:any;
  signature:any;
  jwt:any

  loginForm:FormGroup = new FormGroup({
    email:new FormControl (null,[Validators.required,Validators.email]),
    password:new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    })
    
    
    handeLogin(loginForm: FormGroup) {
      this.isLoading = true;
    
      if (loginForm.valid) {
        // Creating a mock JWT-like structure with Base64 encoding
        this.header = { alg: "HS256", typ: "JWT" };
         this.payload = loginForm.value;
    
        this.encodedHeader = btoa(JSON.stringify(this.header));
        this.encodedPayload = btoa(JSON.stringify(this.payload));
        
        // This is not a real signature, but for demonstration purposes
        this.signature = btoa("dummy_signature");
    
        this.jwt = `${this.encodedHeader}.${this.encodedPayload}.${this.signature}`;
    
        // Storing the mock JWT in local storage
        localStorage.setItem("userToken", this.jwt);
    
        // Simulating a successful login and navigating to the home page
        this.isLoading = false;
        this._router.navigate(['/Home']).then(() => {
           window.location.reload()});
      } else {
        this.isLoading = false;
        console.log("Form is not valid");
      }
    }
    
    
}
