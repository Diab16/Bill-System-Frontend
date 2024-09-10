import { Component } from '@angular/core';
import { CompanyFormComponent } from "../company-form/company-form.component";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CompanyFormComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

}
