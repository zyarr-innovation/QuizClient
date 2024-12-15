import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { QuizService } from '../quiz.service';
import { IQuestion } from '../data/questionCollection';


@Component({
  selector: 'app-question-display',
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './question-display.component.html',
  styleUrl: './question-display.component.css'
})
export class QuestionDisplayComponent {
  questionsEnglish!: IQuestion[];
  questionsUrdu!: IQuestion[];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.getAllQuestions('en').subscribe(data => this.questionsEnglish = data);
    this.quizService.getAllQuestions('ur').subscribe(data => this.questionsUrdu = data);
  }
  
  getCorrectAnswerClass(indexQuestion: number, currentIndex: number, language: string): string {
    const question = language === 'english' ? this.questionsEnglish[indexQuestion] : this.questionsUrdu[indexQuestion];
    const answerIndex = question.answer - 1;

    return currentIndex == answerIndex ? 'correct-answer' : '';
  }
}
