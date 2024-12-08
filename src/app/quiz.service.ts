import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion, QuestionCollection } from './data/questionCollection';
import { EMPTY, from, Observable, of } from 'rxjs';

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

  //---------------- Helper Methods---------------
  constructor(
    private http: HttpClient,
    private questionCollection: QuestionCollection
  ) {
    this.qns = [];
    this.seconds = 0;
    this.qnProgress = 0;
    this.correctAnswerCount = 0;
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
    //return this.http.post(this.rootUrl + "/registerParticipant", body);
    return of(body);
  }

  getParticipantList() {
    return from([localStorage.getItem('participant')]);
    //return this.http.get(this.rootUrl + "/participantList");
  }

  //---------------- Http Methods---------------
  getQuestions(): Observable<IQuestion[]> {
    return new Observable<IQuestion[]>((observer) => {
      this.questionCollection.get().subscribe({
        next: (questions) => {
          observer.next(questions);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  // getAnswers() {
  //   var body = this.qns.map(x => x.id);
  //   return this.http.post(this.rootUrl + "/answers", body);
  // }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant')!);
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    //return this.http.post(this.rootUrl + "/updateScore", body);
    return EMPTY;
  }
}
