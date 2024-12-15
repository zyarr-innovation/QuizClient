import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { QuizService } from '../quiz.service';
import { IQuestion } from '../data/questionCollection';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-display',
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './question-display.component.html',
  styleUrl: './question-display.component.css'
})
export class QuestionDisplayComponent {
  questionsEnglish!: IQuestion[];
  questionsUrdu!: IQuestion[];
  baseQuestions: IQuestion[];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private quizService: QuizService) {
      this.questionsEnglish = [];
      this.questionsUrdu = [];
      this.baseQuestions = [];
    }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlSegments) => {
      const lastPath = urlSegments[0]?.path; // 'revise' or 'review'
      if (lastPath === 'review') {
        this.quizService.getAllQuestions('en').subscribe(data => this.questionsEnglish = data);
        this.quizService.getAllQuestions('ur').subscribe(data => this.questionsUrdu = data);
        this.baseQuestions = this.questionsEnglish;
      } else {
        this.questionsEnglish = [];
        this.questionsUrdu = [];
        const selectedLanguage = this.quizService.getLanguage();
        if (selectedLanguage === 'en') {
          this.quizService.getAllQuestions('en').subscribe(data => {
            this.questionsEnglish = data;
            this.baseQuestions = this.questionsEnglish;
          });
        } else if (selectedLanguage === 'ur') {
          this.quizService.getAllQuestions('ur').subscribe(data => {
            this.questionsUrdu = data;
            this.baseQuestions = this.questionsUrdu;
          });
        }
      }
    });
  }
    
  
  getCorrectAnswerClass(indexQuestion: number, currentIndex: number, language: string): string {
    const question = language === 'english' ? this.questionsEnglish[indexQuestion] : this.questionsUrdu[indexQuestion];
    const answerIndex = question.answer - 1;

    return currentIndex == answerIndex ? 'correct-answer' : '';
  }
}
