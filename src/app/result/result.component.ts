import { Component, OnInit } from "@angular/core";
import { QuizService } from "../shared/quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  public isResultSubmitted: Boolean;

  constructor(public quizService: QuizService, private router: Router) {
    this.isResultSubmitted = false;
  }

  ngOnInit() {
    if (
      parseInt(localStorage.getItem("qnProgress")) ==
      this.quizService.qns.length
    ) {
      this.quizService.seconds = parseInt(localStorage.getItem("seconds"));
      this.quizService.qnProgress = parseInt(
        localStorage.getItem("qnProgress")
      );
      this.quizService.qns = JSON.parse(localStorage.getItem("qns"));

      this.quizService.correctAnswerCount = 0;
      this.quizService.qns.forEach(eachQuestion => {
        if (eachQuestion.choice == eachQuestion.answer) {
          this.quizService.correctAnswerCount++;
        }
        eachQuestion.correct = eachQuestion.answer;
      });

      // this.quizService.getAnswers().subscribe((data: any) => {
      //   this.quizService.correctAnswerCount = 0;
      //   this.quizService.qns.forEach((e, i) => {
      //     if (e.answer == data[i]) {
      //       this.quizService.correctAnswerCount++;
      //     }
      //     e.correct = data[i];
      //   });
      // });
    } else {
      this.router.navigate(["/quiz"]);
    }
  }

  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      //this.restart();
      this.isResultSubmitted = true;
    });
  }

  OnDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  restart() {
    this.isResultSubmitted = false;
    localStorage.setItem("qnProgress", "0");
    localStorage.setItem("qns", "");
    localStorage.setItem("seconds", "0");
    this.router.navigate(["/quiz"]);
  }
}
