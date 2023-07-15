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

  getRandomOrder(): number[] {
    const numbers: number[] = [0, 1, 2, 3];
    const randomOrder: number[] = [];

    while (numbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers.splice(randomIndex, 1)[0];
      randomOrder.push(randomNumber);
    }

    return randomOrder;
  }

  randomizeOptions(currentQuestion: IQuestion): IQuestion {
    let orderIndexArray = this.getRandomOrder();

    let returnQuestion: IQuestion = currentQuestion;
    for (let i = 0; i < orderIndexArray.length; ++i) {
      returnQuestion.optionList[i] = currentQuestion.optionList[orderIndexArray[i]]
    }

    for (let i = 0; i < orderIndexArray.length; ++i) {
      if (currentQuestion.answer == (orderIndexArray[i] + 1)) {
        returnQuestion.answer = i + 1;
        break;
      }
    }

    return returnQuestion;
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