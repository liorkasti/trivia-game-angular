import { Component, Input, OnInit } from '@angular/core';
import { GameManagerService } from '../game-manager.service';

export interface Progress{
  totalNumber: number;
  currentNumber: number;
}

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() progressInfo: Progress;
  btnColor: string;
 
  constructor(private gameManagerService: GameManagerService) { }

  ngOnInit(): void {
  }

  shouldEnable(index: number) : boolean{
    return index > this.progressInfo.currentNumber;
  }

  goToQuestion(index: number){
    console.log(index);
    this.progressInfo.currentNumber = index;
    this.gameManagerService.setCurrentQuestion(index);
  }
}
