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
  successMessage: string = '';
  showPopup: boolean = false;

  constructor(public TypeServ: TypeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.TypeServ.GetAllTypes().subscribe({
      next: (response) => (this.Types = response),
    });
  }

  deleteHandler(typeId: any) {
    this.TypeServ.DeleteType(typeId).subscribe({
      next: () => {
        this.Types = this.Types.filter((t) => t.typeId != typeId);
        this.showPopupMessage('Type deleted successfully');
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

  showPopupMessage(message: string) {
    this.successMessage = message;
    this.showPopup = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showPopup = false;
      this.cdr.detectChanges();
    }, 2000); // Hide after 2 seconds
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
