import { InvoicesComponent } from './../invoices/invoices.component';
import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ManageComponent } from '../manage/manage.component';
import { ReportsComponent } from '../reports/reports.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet ,RouterLink,RouterLinkActive,RouterModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
