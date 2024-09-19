import { Component, OnInit } from '@angular/core';
import { IType } from '../../Models/iType';
import { TypeService } from '../../Services/type.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent implements OnInit {
  Types: IType[] = [];

  constructor(public TypeServ: TypeService) {}

  ngOnInit(): void {
    this.TypeServ.GetAllTypes().subscribe({
      next: (response) => (this.Types = response),
    });
  }

  deleteHandler(typeId: any) {
    this.TypeServ.DeleteType(typeId).subscribe({
      next: () => {
        this.Types = this.Types.filter((t) => t.typeId != typeId);
      },
    });
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
}
