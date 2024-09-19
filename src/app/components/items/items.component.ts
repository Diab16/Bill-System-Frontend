import { SearchPipePipe } from './../../search-pipe.pipe';
import { Component, OnInit, Pipe } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { ItemsServiceService } from '../../Services/items-service.service';
import { Iitems } from '../../Interfaces/Iitems';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ RouterLink ,CommonModule ,SearchPipePipe ,FormsModule ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  constructor(private service:ItemsServiceService , public router:Router ){}
  itemms: Iitems[] = [];
  searchterm: string =''

  isLoading = false;
  message: string = '';
  ngOnInit(): void {
    
    this.loadItems();

  }


  loadItems() {
    this.service.getAllItems().subscribe({
      next: (items) => this.itemms = items,
      error: (error) => console.error('Error loading items:', error)
    });
  }

  Delete(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.isLoading = true;
      this.service.deleteItem(id).subscribe({
        next: (response) => {
          console.log(response);
          this.message = 'Item deleted successfully';
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.message = 'Error deleting item';
        },
        complete: () => {
          this.isLoading = false;
          this.loadItems();
        }
      });
    }
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
