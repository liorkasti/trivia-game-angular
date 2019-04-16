import { Injectable } from '@angular/core';
import * as data from '../gameData/questions.json';
import { Question } from './question/question.component';

const questions = data.default;

@Injectable({
  providedIn: 'root'
})

export class GameManagerService {
  private questionsData: Question[];
  private curIndex : number;
  private totalScore: number;

  constructor() {
    this.setQuestions();
    this.curIndex = 0;
    this.totalScore = 0;
  }

  setQuestions() {
    let questionNumer = 1;
    this.questionsData = new Array<Question>();

    questions.results.forEach((value) => {
      let qst: Question = {
        question: value.question,
        questionNumber: questionNumer,
        correctOption: value.correct_answer,
        options: value.incorrect_answers,
        difficulty : value.difficulty
      }
      
      var rnd = Math.floor(Math.random() * 4) + 1;  
      qst.options.splice(rnd,0, qst.correctOption);
      questionNumer++;

      this.questionsData.push(qst)
    });
  }

  getCurrentQuestion() : Question {
    return this.questionsData[this.curIndex];
  }

  questionAnswered(){
    let newScore = 0;
    this.questionsData[this.curIndex].checkAnswer = true;
    
    if (this.questionsData[this.curIndex].selectedAnswer == this.questionsData[this.curIndex].correctOption){
      
      if (this.questionsData[this.curIndex].difficulty == "easy"){
        newScore = 1;
      }
      else if (this.questionsData[this.curIndex].difficulty == "medium"){
        newScore = 2;
      }
      else if (this.questionsData[this.curIndex].difficulty == "hard"){
        newScore = 3;
      }

      this.totalScore = this.totalScore + newScore;
    }
    
    this.curIndex++;
  }

  getNumberOfQuestions(): number {
    return this.questionsData.length;
  }

  getCurrentQuestionSelectionState(): boolean{
    return this.questionsData[this.curIndex].selectedAnswer == undefined;
  }

  getCurrentIndex(): number{
    return this.curIndex;
  }
}