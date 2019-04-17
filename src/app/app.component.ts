import { Component, OnInit, Input } from '@angular/core';
import { GameManagerService } from './game-manager.service';
import { Question } from './question/question.component';
import { Progress } from './progress/progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() questionInfo: Question;

  title = 'who-wants-to-be-zoominfo';
  private currentQuestion : Question;
  private progress: Progress;
  buttonText: string;

  constructor(private gameManagerService: GameManagerService) {  }

  ngOnInit() {
    this.getCurrentQuestion();
    this.initiallizeProgress();
    this.buttonText = "Ok";
  }

  initiallizeProgress(){
    this.progress = {
      totalNumber : this.gameManagerService.getNumberOfQuestions(),
      currentNumber : this.gameManagerService.getCurrentIndex()
    }
  }

  isSelected(buttonText : string) : boolean{
    return this.buttonText === "Continue";
  }

  questionAnswered(){
    if (this.gameManagerService.getCurrentIndex() == this.progress.totalNumber - 1){
      //todo: open dialog
    }
    if(this.buttonText === "Continue"){
      this.getCurrentQuestion();
      this.progress.currentNumber ++;
      this.buttonText = "Ok";
    }else{
      this.buttonText = "Continue";
      this.gameManagerService.questionAnswered();
    }
  }

  getCurrentQuestion(){
    this.currentQuestion = this.gameManagerService.getCurrentQuestion();
  }

  getCurrentStateSelection() :boolean{
    return this.buttonText != "Continue" && this.gameManagerService.getCurrentQuestionSelectionState();
  }
}
