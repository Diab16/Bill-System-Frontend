import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUnit } from '../../../Models/iunit';
import { UnitService } from '../../../Services/unit.service';

@Component({
  selector: 'app-unit-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit {
  id: any;
  unit: IUnit | null = null;

  constructor(private unitService: UnitService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.unitService.getUnit(this.id).subscribe({
        next: (response) => {
          this.unit = response;
        },
        error: (error) => {
          console.error('Error fetching unit details:', error);
        }
      });
    }
  }

  hoverIn() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    if (btn1 && btn2) {
      btn1.style.display = 'none';
      btn2.style.display = 'block';
    }
  }

  hoverOut() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    if (btn1 && btn2) {
      btn1.style.display = 'block';
      btn2.style.display = 'none';
    }
  }
}
