import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UnitService } from '../../../Services/unit.service';
import { IUnit } from '../../../Models/iunit';
import { FormsModule } from '@angular/forms';
import { SearchPipePipe } from "../../../search-pipe.pipe"; 

@Component({
  selector: 'app-all-units',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, SearchPipePipe],
  templateUrl: './all-units.component.html',
  styleUrls: ['./all-units.component.css']
})
export class AllUnitsComponent {
  units: IUnit[] = [];
  searchterm: string = '';
  successMessage : string|null = null;
  constructor(private unitService: UnitService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.unitService.getUnits().subscribe({
      next: (response) => {
        this.units = response;
      }
    });
  }

  hoverIn() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    if (btn1 && btn2) {
      btn1.style.display = "none";
      btn2.style.display = "block";
    }
  }

  hoverOut() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    if (btn1 && btn2) {
      btn1.style.display = "block";
      btn2.style.display = "none";
    }
  }

  deleteUnit(unitId: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.unitService.deleteUnit(unitId).subscribe({
        next: () => {
          this.successMessage = "Unit Deleted Successfully";
          setTimeout(()=>{
            this.successMessage = null;   
            this.units = this.units.filter(u => u.id !== unitId);       
          },2000)
        }
      });
    }
  }
}
