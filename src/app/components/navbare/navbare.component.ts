import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbare',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './navbare.component.html',
  styleUrl: './navbare.component.css'
})
export class NavbareComponent implements OnInit {
  isLoggedIn = false;
  email: string | null = '';
   constructor( private  router:Router){}

  ngOnInit(): void { 
     // Check if the user token is stored in local storage
     const token = localStorage.getItem('userToken');
    
     if (token) {
       // Decode the JWT-like structure
       const tokenParts = token.split('.');
       
       if (tokenParts.length === 3) {
         const encodedPayload = tokenParts[1];  // Second part is the payload
         const decodedPayload = atob(encodedPayload);  // Decode the Base64 payload
         
         // Parse the decoded payload to retrieve user information
         const payloadObject = JSON.parse(decodedPayload);
         this.email = payloadObject.email;  // Assuming the payload contains an 'email' field
         this.isLoggedIn = true;
       }
     }

  }




  logout(): void {
    // Clear the local storage token
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;

    // Navigate to the login page
    this.router.navigate(['/Login']);
  }

}
