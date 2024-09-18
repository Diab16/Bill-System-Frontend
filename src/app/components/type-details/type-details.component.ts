import { Component, OnInit } from '@angular/core';
import { TypeService } from '../../Services/type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IType } from '../../Models/iType';

@Component({
  selector: 'app-type-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-details.component.html',
  styleUrl: './type-details.component.css'
})
export class TypeDetailsComponent implements OnInit {
  typeId: number = 0;
  Type: IType | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private TypeServ: TypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.typeId = Number(this.activatedRoute.snapshot.params['id']);
    this.TypeServ.GetTypeById(this.typeId).subscribe({
      next: (response: IType) => {
        this.Type = response;
      },
      error: (err) => {
        console.error('Error fetching type details:', err);
      },
    });
  }

  backToProducts() {
    this.router.navigate(['/manage/Type']);
  }
}
