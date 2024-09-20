import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemsServiceService } from '../../Services/items-service.service';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-details',
  standalone: true,
  imports: [RouterLink ,CommonModule],
  templateUrl: './items-details.component.html',
  styleUrl: './items-details.component.css'
})
export class ItemsDetailsComponent  implements OnInit{

  id:any;
  Item:any;

  constructor(private activatedRoute : ActivatedRoute , private Service : ItemsServiceService) 
  {   
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Service.getById(this.id).subscribe({
      next:(resp)=>{
        this.Item = resp;
      }
    })
  }

  hoverIn(){
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    if(btn1 && btn2){
      btn1.style.display ="none";
      btn2.style.display ="block";
    }
  }
  hoverOut(){
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    if(btn1 && btn2){
      btn1.style.display ="block";
      btn2.style.display ="none";
    }
  }




}
