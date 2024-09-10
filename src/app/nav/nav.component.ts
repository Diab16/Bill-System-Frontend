import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  logoPath = '/src/assets/logo.png';

}
