import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient , private router:Router ) { }
  userData= new BehaviorSubject(null);

   basurl:string ='https://localhost:44301/api/Account/Login';

  

  isLogOut()
  {
    localStorage.removeItem("usertoken");
    this.userData.next(null);
    this.router.navigate(['/Login'])
  }

  decodeUserData()
  {
    let encodedToken= JSON.stringify( localStorage.getItem('usertoken'));
     let decodedToken:any = jwtDecode(encodedToken);
     console.log(decodedToken);
     this.userData.next(decodedToken);
     console.log(this.userData);
     const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
     return email
  }


  Login(userdata:any):Observable<any>
  {
      return this.http.post(`${this.basurl}`, userdata)
  }






}
