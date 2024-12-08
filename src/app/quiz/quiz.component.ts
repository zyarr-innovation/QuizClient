import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  public progressBarPercentage: Number;

  constructor(private router: Router, public quizService: QuizService) { 
    this.progressBarPercentage = 0;
  }

  ngOnInit() {

    if (parseInt(localStorage.getItem("seconds")!) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem("seconds")!);
      this.quizService.qnProgress = parseInt(localStorage.getItem("qnProgress")!);

      this.quizService.qns = JSON.parse(localStorage.getItem("qns")!);
      this.progressBarPercentage = 1;

      if (this.quizService.qns && this.quizService.qnProgress == this.quizService.qns.length) {
        this.router.navigate(["/result"]);
      } else {
        this.startTimer();
      };

    } else {

      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe((data: any) => {
        this.quizService.qns = data;
        this.startTimer();
      });
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem("seconds", this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(choice: any) {
    this.quizService.qns[this.quizService.qnProgress].choice = choice;
    localStorage.setItem("qns", JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    this.progressBarPercentage =
      ((this.quizService.qnProgress + 1) / this.quizService.qns.length) * 100;
    localStorage.setItem("qnProgress", this.quizService.qnProgress.toString());

    if (this.quizService.qnProgress == this.quizService.qns.length) {
      clearInterval(this.quizService.timer);
      this.router.navigate(["/result"]);
    }
  }
  
}
