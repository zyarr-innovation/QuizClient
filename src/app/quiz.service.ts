import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, QuestionCollection } from './data/questionCollection';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const NUMBER_OF_QUESTIONS = 50;
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = window.location.origin;
  //readonly rootUrl = "http://127.0.0.1:8080";

  qns: any[];
  seconds: number;
  timer: any;
  qnProgress: number;
  correctAnswerCount: number;
  language: string

  //---------------- Helper Methods---------------
  constructor(
    private http: HttpClient,
    private questionCollection: QuestionCollection
  ) {
    this.qns = [];
    this.seconds = 0;
    this.qnProgress = 0;
    this.correctAnswerCount = 0;
    this.language = 'en';
  }

  setLanguage(language: string){
    this.language = language;
  }

  getLanguage(){
    return this.language;
  }

  displayTimeElapsed() {
    return (
      Math.floor(this.seconds / 3600) +
      ':' +
      Math.floor(this.seconds / 60) +
      ':' +
      Math.floor(this.seconds % 60)
    );
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant')!);
    return participant.name;
  }

  insertParticipant(name: string, email: string) {
    var body = {
      name: name,
      email: email,
    };
    localStorage.setItem('participant', JSON.stringify(body));
    return of(body);
  }

  getParticipantList() {
    return from([localStorage.getItem('participant')]);
  }

  //---------------- Http Methods---------------
  getQuestions(): Observable<IQuestion[]> {
    return this.questionCollection.get(this.language).pipe(
      map((questions) => {
        const randomQuestions = this.getRandomQuestions(
          questions,
          NUMBER_OF_QUESTIONS
        );
        return randomQuestions.map((question) =>
          this.randomizeOptions(question)
        );
      })
    );
  }

  private getRandomQuestions(
    questions: IQuestion[],
    count: number
  ): IQuestion[] {
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    // Return the first `count` questions
    return questions.slice(0, count);
  }

  private randomizeOptions(question: IQuestion): IQuestion {
    const options = [...question.options];
    const correctAnswer = options[question.answer - 1]; // Get the correct answer using 1-based index
    const shuffledOptions = options
      .map((option) => ({ option, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ option }) => option);
    const newAnswerIndex = shuffledOptions.indexOf(correctAnswer) + 1; // Adjust back to 1-based index

    return {
      ...question,
      options: shuffledOptions,
      answer: newAnswerIndex,
    };
  }
  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant')!);
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return of(body);
  }
 

  getAllQuestions(language: string): Observable<IQuestion[]> {
    return this.questionCollection.get(language);
  }
}
