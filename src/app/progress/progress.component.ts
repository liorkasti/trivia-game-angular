import { Component, Input, OnInit } from '@angular/core';

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
 
  constructor() { }

  ngOnInit(): void {
  }

  shouldEnable(index: number) : boolean{
    return index > this.progressInfo.currentNumber;
  }
}
