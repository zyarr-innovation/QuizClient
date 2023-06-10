import { IQuestion, QuestionCollection } from './questionCollection';

export class QuestionList {
  private questionCollection: QuestionCollection;
  private questionList: IQuestion[];
  private currentQuestionIndex = 0;
  constructor() {
    this.questionCollection = new QuestionCollection();
    this.questionList = this.questionCollection.get();
    this.questionList.forEach(eachQuestion => this.randomizeOptions(eachQuestion));
  }

  randomizeOptions(currentQuestion: IQuestion): IQuestion {
    let swapIndex = Math.floor(Math.random() * 4); //number between 0 to 3
    let initial = currentQuestion.optionList[swapIndex];
    currentQuestion.optionList[swapIndex] = currentQuestion.optionList[0];
    currentQuestion.optionList[0] = initial;
    currentQuestion.answer = swapIndex + 1;

    return currentQuestion;
  }

  getList(inCount: number): IQuestion[] {
    return this.questionList;
  }

  getCurrent(): IQuestion {
    let currentQuestion: IQuestion = this.questionList[this.currentQuestionIndex];
    return currentQuestion;
  }
  getAnswer(): number {
    return this.questionList[this.currentQuestionIndex].answer;
  }
  moveToNext(): boolean {
    let isComplete = false;
    ++this.currentQuestionIndex;

    if (this.currentQuestionIndex == this.questionList.length) {
      this.currentQuestionIndex = 0;
      isComplete = true;
    } else {
      let currentQuestion: IQuestion = this.questionList[this.currentQuestionIndex];
      this.randomizeOptions(currentQuestion);
    }

    return isComplete;
  }
}