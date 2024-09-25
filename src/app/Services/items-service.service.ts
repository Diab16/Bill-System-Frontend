import { Iitems } from './../Interfaces/Iitems';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormdata } from '../Interfaces/Iformdata';
@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {

  constructor(public httpclint:HttpClient) { }
 // apiurl = "https://localhost:44301/api/Items"
 apiurl =  "https://localhost:7200/api/Items"  


 getAllItems():Observable<Iitems[]>
 {
      return this.httpclint.get<Iitems[]>(`${this.apiurl}/AllItems ` )
 }

 getFormData():Observable<IFormdata>
 {
      return this.httpclint.get<IFormdata>(`${this.apiurl}/FormData` )
 }


 AddItem(items:Iitems[]):Observable<Iitems[]>
 {
      return this.httpclint.post<Iitems[]>(`${this.apiurl}` , items )
 }


 getById(id:number):Observable<any>
 {
     return this.httpclint.get<Iitems>(`${this.apiurl}/GetById/${id}`)
 }
 getAmountById(id:number):Observable<any>
 {
     return this.httpclint.get<number>(`${this.apiurl}/GetAmountById/${id}`)
 }

editItem(item:Iitems)
{
     return this.httpclint.put<Iitems>(`${this.apiurl}` , item)
}
editAmountByItemId( id:number , amount:number)
{
     return this.httpclint.put(`${this.apiurl}/${id}/${amount}`,null)
}

deleteItem(id:number)
{
     return this.httpclint.delete(`${this.apiurl}/${id}`)
}


}
