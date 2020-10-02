import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css'],
})
export class ConfirmBoxComponent implements OnInit {
  @Input() answer: boolean;
  @Input() data: string;
  @Output() userAnswer: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.answer = false;
  }

  onClick = (ans: boolean) => {
    this.answer = ans;
    this.userAnswer.emit(this.answer);
  };
}
