import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ItemsComponent } from '../Item/items/items.component';
import { ItemsServiceService } from '../../Services/items-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,RouterModule , ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _auth:AuthService , private _router:Router){}
  isLoading:boolean=false;
  ApiError:string='';

  loginForm:FormGroup = new FormGroup({
    Email:new FormControl (null,[Validators.required,Validators.email]),
    Password:new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9@]{5,10}$/)]),
    })
    
    
    handeLogin(loginForm:FormGroup)
    {

      this.isLoading=true; 
       if (loginForm.valid)
      {
         this. _auth.Login(loginForm.value).subscribe({
          next:(responce)=>{
            console.log(loginForm.value);
            // navigate here
            console.log(responce);
              localStorage.setItem("usertoken",responce.token);
              this._auth.decodeUserData();
               this.isLoading=false;
               this._router.navigate(['/Home'])
               
          },
    
          error:(err)=>
          {
            this.isLoading=false;
            this.ApiError= err.error;
            console.log(this.ApiError);
            
            
            
          }
          
         })
       }    
    }
    
    
}
