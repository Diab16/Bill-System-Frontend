import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClientService } from '../../../Services/client.service';
import { IClient } from '../../../Models/iclient';  
import { FormsModule } from '@angular/forms';
import { SearchPipePipe } from "../../../search-pipe.pipe"; 

@Component({
  selector: 'app-all-clients',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, SearchPipePipe],
  templateUrl: './all-clients.component.html',  
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent {
  clients: IClient[] = [];  
  searchterm: string = '';

  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      }
    });
  }

  hoverIn() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    if (btn1 && btn2) {
      btn1.style.display = "none";
      btn2.style.display = "block";
    }
  }

  hoverOut() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    if (btn1 && btn2) {
      btn1.style.display = "block";
      btn2.style.display = "none";
    }
  }

  deleteClient(clientId: any) {
    //message for accepting the delete
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(clientId).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== clientId);
        }
      });
    }
  }
}
