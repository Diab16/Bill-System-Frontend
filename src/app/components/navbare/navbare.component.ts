import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbare',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './navbare.component.html',
  styleUrl: './navbare.component.css'
})
export class NavbareComponent {
  isLoggedIn = false;
  email:string =''
  constructor(private _auth:AuthService)
  {
    this._auth.userData.subscribe({
      next: (userData) => {
        if (userData) {
          this.isLoggedIn = true; // User is logged in
          this.email = userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          ; // Extract email from the decoded token
        } else {
          this.isLoggedIn = false; // User is logged out
        }
      }
    });

    if (localStorage.getItem('usertoken')) {
      this.email = this._auth.decodeUserData();  // Get the email from token
    }
  }






  logout(): void {
    this._auth.isLogOut();

  }

}
