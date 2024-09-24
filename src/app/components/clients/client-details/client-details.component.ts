import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IClient } from '../../../Models/iclient';
import { ClientService } from '../../../Services/client.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: any;
  client: IClient | null = null;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.clientService.getClient(this.id).subscribe({
        next: (response) => {
          this.client = response;
        },
        error: (error) => {
          console.error('Error fetching client details:', error);
        }
      });
    }
  }

  hoverIn() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    if (btn1 && btn2) {
      btn1.style.display = 'none';
      btn2.style.display = 'block';
    }
  }

  hoverOut() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    if (btn1 && btn2) {
      btn1.style.display = 'block';
      btn2.style.display = 'none';
    }
  }
}
