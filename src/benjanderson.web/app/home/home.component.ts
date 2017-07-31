import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private message = `My name is Ben and I make apps←←←←web applications←←←←←←←←←←←←←←←←web services←←←←←←←←←←←←stuff. 
  I currently live in Salt Lake City, Utah.`;

  public displayedMessage = '';

  private location = 0;

  constructor() { }

  ngOnInit(): void {
    this.displayMessage();
  }

  private displayMessage(wait?: number) {
    setTimeout(() => {
      if (this.location < this.message.length) {
        const newChar = this.message.charAt(this.location);
        let isBackspace: boolean;
        let delta: number;

        if (newChar === '←') {
          this.displayedMessage = this.displayedMessage.substr(0, this.displayedMessage.length - 1);
          isBackspace = true;
          delta = 50 + (Math.random() * 50);
        } else {
          this.displayedMessage += newChar;
          isBackspace = false;
          delta = 50 + (Math.random() * 200);
        }

        this.location++;
        this.displayMessage(delta);
      }
    }, wait || 100);
  }
}
