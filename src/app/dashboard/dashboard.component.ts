import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  displayedColumns: string[] = ['name', 'score', 'timeSpent']; // Define column names here
  data: any[] = [];
  sortedData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/dashboard.json').subscribe((response) => {
      this.data = response;
      this.sortedData = this.data.sort(
        (a, b) => b.Score - a.Score || a.TimeSpent - b.TimeSpent
      );
    });
  }
}
