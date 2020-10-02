import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css'],
})
export class PopUpMessageComponent implements OnInit {
  isSuccess: boolean;
  isError: boolean;
  @Input() message: string;
  @Input() responseType: string;

  constructor() {}

  ngOnInit(): void {
    this.isSuccess = this.isError = false;
    this.displayServerMessage();
  }

  displayServerMessage() {
    setTimeout(() => {
      this.checkResponseType();
      this.activeServerMessage();
    }, 1000);
  }

  activeServerMessage() {
    setTimeout(() => {
      this.checkResponseType();
    }, 5000);
  }

  checkResponseType() {
    this.responseType === 'success'
      ? (this.isSuccess = !this.isSuccess)
      : (this.isError = !this.isError);
  }
}
