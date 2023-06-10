import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { QuizServerRoutes } from '../server-info/quiz-server-routes'
import { EMPTY, from, of } from "rxjs";

@Injectable()
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = window.location.origin;
  //readonly rootUrl = "http://127.0.0.1:8080";
  serverRoutes: QuizServerRoutes = new QuizServerRoutes();

  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return (
      Math.floor(this.seconds / 3600) +
      ":" +
      Math.floor(this.seconds / 60) +
      ":" +
      Math.floor(this.seconds % 60)
    );
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem("participant"));
    return participant.Name;
  }

  insertParticipant(name: string, email: string) {
    var participantInfo = {
      name: name,
      email: email
    };
    localStorage.setItem("participant", JSON.stringify(participantInfo))
    this.serverRoutes.registerParticipant(name, email)
    return of(participantInfo);
  }

  getParticipantList() {
    return of(this.serverRoutes.getParticipantList());
  }

  //---------------- Http Methods---------------
  getQuestions() {
    return of(this.serverRoutes.getQuestionList());
  }

  // getAnswers() {
  //   var body = this.qns.map(x => x.Id);
  //   return this.http.post(this.rootUrl + "/answers", body);
  // }

  submitScore() {
    var participant = JSON.parse(localStorage.getItem("participant"));
    participant.Score = this.correctAnswerCount;
    participant.TimeSpent = this.seconds;

    this.serverRoutes.updateScore(
      participant.Id,
      participant.Score,
      participant.TimeSpent,
    )

    return EMPTY;
  }
}
