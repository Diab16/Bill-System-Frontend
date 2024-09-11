import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbareComponent } from "./components/navbare/navbare.component";
import { SideNavbareComponent } from "./components/side-navbare/side-navbare.component";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbareComponent, SideNavbareComponent, MainComponent ,RouterLink,RouterModule ,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bill';
}
