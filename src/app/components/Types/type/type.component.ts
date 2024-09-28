import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IType } from '../../../Models/iType';
import { TypeService } from '../../../Services/type.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent implements OnInit {
  Types: IType[] = [];
  searchterm: string = '';
  successMessage: string | null = null; // For storing success message
  sortFlag:boolean = true;
  sortArrow:number= 0;

  constructor(public TypeServ: TypeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.TypeServ.GetAllTypes().subscribe({
      next: (response) => (this.Types = response),
    });
  }

  SortByCompany(){
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.Types.sort((a,b)=>{
        if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) {
          return 1;
        }else if(a.companyName.toLowerCase() < b.companyName.toLowerCase()) {
          return -1;
        }else{
          return 0;
        }
      });
    } else {
      this.Types.sort((a,b)=>{
        if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) {
          return -1;
        }else if(a.companyName.toLowerCase() < b.companyName.toLowerCase()) {
          return 1;
        }else{
          return 0;
        }
      });
    }
    this.sortArrow = 2;
  }
  SortByName(){
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.Types.sort((a,b)=>{
        if (a.typeName.toLowerCase() > b.typeName.toLowerCase()) {
          return 1;
        }else if(a.typeName.toLowerCase() < b.typeName.toLowerCase()) {
          return -1;
        }else{
          return 0;
        }
      });
    } else {
      this.Types.sort((a,b)=>{
        if (a.typeName.toLowerCase() > b.typeName.toLowerCase()) {
          return -1;
        }else if(a.typeName.toLowerCase() < b.typeName.toLowerCase()) {
          return 1;
        }else{
          return 0;
        }
      });
    }
    this.sortArrow = 1;
  }
  SortById(){
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.Types.sort((a,b)=>a.typeId - b.typeId);
    } else {
      this.Types.sort((a,b)=>b.typeId - a.typeId);
    }
    this.sortArrow=0;
  }
  deleteHandler(typeId: any) {
    if (confirm('Are you sure you want to delete this Type?')) {
      this.TypeServ.DeleteType(typeId).subscribe({
        next: () => {
          this.successMessage = 'Type deleted Successfully!';
          setTimeout(() => {
            this.successMessage=null;
            this.Types = this.Types.filter((t) => t.typeId != typeId);
          }, 2000);
          
        },
      });
    }
    
  }

  hoverIn() {
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    if (btn1 && btn2) {
      btn1.style.display = 'none';
      btn2.style.display = 'block';
    }
  }

  hoverOut() {
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    if (btn1 && btn2) {
      btn1.style.display = 'block';
      btn2.style.display = 'none';
    }
  }

  filteredTypes(): IType[] {
    if (!this.searchterm) return this.Types;
    return this.Types.filter(type =>
      type.companyName.toLowerCase().includes(this.searchterm.toLowerCase()) ||
      type.typeName.toLowerCase().includes(this.searchterm.toLowerCase()) ||
      (type.typeNotes || "").toLowerCase().includes(this.searchterm.toLowerCase())
    );
  }
}
