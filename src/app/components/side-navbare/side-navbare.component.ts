import { Component  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-navbare',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './side-navbare.component.html',
  styleUrl: './side-navbare.component.css'
})
export class SideNavbareComponent {

}
