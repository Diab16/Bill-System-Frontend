import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { NavComponent } from "./nav/nav.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavComponent } from "./side-nav/side-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompanyFormComponent, NavComponent, NgbModule, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bill';
}
