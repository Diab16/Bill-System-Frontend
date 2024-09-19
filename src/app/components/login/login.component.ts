import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ItemsComponent } from '../items/items.component';
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

  loginForm:FormGroup = new FormGroup({
    email:new FormControl (null,[Validators.required,Validators.email]),
    password:new FormControl (null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    })
    
    
    handeLogin(loginForm:FormGroup)
    {
      this.isLoading=true; 
       if (loginForm.valid)
      {
    
         this. _auth.getAllItems().subscribe({
          next:(responce)=>{
            console.log(loginForm.value);
            
            // navigate here
            console.log(responce);
            if (responce) {
              // localStorage.setItem("usertoken",responce);
              // this._auth.decodeUserData();
              //  this.isLoading=false;
               this._router.navigate(['/Home'])
              
              
            }
          },
    
          error:(err)=>
          {
            this.isLoading=false;
            this.ApiError= err.error.message;
            ;
            console.log(this.ApiError);
            
            
            
          }
          
         })
       }    
    }
}
