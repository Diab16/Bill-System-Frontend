import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbareComponent } from "./components/navbare/navbare.component";
import { SideNavbareComponent } from "./components/side-navbare/side-navbare.component";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from '@angular/common';
import { UnitsComponent } from './components/units/units.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './components/Company/company-form/company-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbareComponent, SideNavbareComponent, MainComponent ,RouterLink,RouterModule ,CommonModule,CompanyFormComponent,UnitsComponent,ClientsComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bill';
  
}
