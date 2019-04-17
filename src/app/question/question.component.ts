import { Component, OnInit, Input } from '@angular/core';

export interface Question {
  questionNumber: number;
  question: string;
  options: string[];
  correctOption: string;
  difficulty: string;
  selectedAnswer?: string;
  checkAnswer?: boolean;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  myImgUrl: string;
  myBtnClass: string = 'option';
  
  @Input() questionInfo: Question;

  constructor() { }

  ngOnInit() { }

  answerSelected(selectedAnswer: string) {
    this.questionInfo.selectedAnswer = selectedAnswer;
  }

  isSelected(selectedAnswer: string) : boolean{
    // this.myBtnClass = 'option-clicked';
    console.log(this.myBtnClass);
    return selectedAnswer == this.questionInfo.selectedAnswer;
  }

  checkCorrectness(selectedAnswer: string): boolean {
    let checkCorrectness = this.questionInfo.checkAnswer;

    if (checkCorrectness) {
      if (this.questionInfo.selectedAnswer == this.questionInfo.correctOption) {
        this.myImgUrl = 'assets/images/Right.png';
        this.myBtnClass = 'option-right';
        console.log(this.myBtnClass);
      }
      else {
        this.myImgUrl = 'assets/images/Wrong.png';
        this.myBtnClass = 'option-wrong';
        console.log(this.myBtnClass);
      }
    }

    return checkCorrectness && this.isSelected(selectedAnswer);
  }

}
