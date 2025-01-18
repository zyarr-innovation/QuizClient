import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private quizService: QuizService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.url.subscribe((urlSegments) => {
      const targetCode = urlSegments[0].path; // 'en' or 'ur'
      quizService.setTargetData(targetCode.toLowerCase());
    });
  }

  ngOnInit() {}

  OnSubmit(name: string) {
    let email: string = 'temp@ge.com';
    this.quizService.insertParticipant(name, email).subscribe((data: any) => {
      localStorage.clear();
      localStorage.setItem('participant', JSON.stringify(data));
      this.route.navigate(['/quiz']);
    });
  }

  navigateToReview(): void {
    this.route.navigate(['/revise']);
  }

  navigateToDashboard(): void {
    this.route.navigate(['/dashboard']);
  }
}
