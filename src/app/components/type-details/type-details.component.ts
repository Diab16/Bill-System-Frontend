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
  Type: IType | null = null; // Use the IType interface

  constructor(
    private activatedRoute: ActivatedRoute,
    private TypeServ: TypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the typeId from the URL
    this.typeId = Number(this.activatedRoute.snapshot.params['id']);

    // Fetch the type details using the service
    this.TypeServ.GetTypeById(this.typeId).subscribe({
      next: (response: IType) => {
        this.Type = response;
        console.log(this.Type);
      },
      error: (err) => {
        console.error('Error fetching type details:', err);
      },
    });
  }

  editType() {
    // Navigate to the edit form with the typeId
    this.router.navigate([`/manage/editType/${this.typeId}`]);
  }

  addType() {
    // Navigate to the add type form
    this.router.navigate(['/manage/addType']);
  }

  backToProducts() {
    // Navigate back to the types list
    this.router.navigate(['/Type']);
  }
}
