import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bday',
  templateUrl: './bday.component.html',
  styleUrls: ['./bday.component.scss']
})
export class BdayComponent implements OnInit {
  answer: string;
  question: string;
  clue: string;
  showWrong = false;
  showWin = false;
  headerClicked = false;
  questionNumber = 0;

  questions = [
    {
      'question': 'Ennyn Durin Aran Moria. Pedo Mellon a Minno. Im Narvi hain echant. Celebrimbor o Eregion teithant i thiw hin.',
      'answer': 'friend',
      'clue': '26'
    },
    {
      'question': `Square root of ((years of marriage * Anderson grand children)
       - (bedrooms in our house * Mason age in months) + years in house)`,
      'answer': '9',
      'clue': '12'
    },
    {
      'question': `As a stone inside a tree, Ill help your words outlive thee.
      But if you push me as I stand, the more I move the less I am.`,
      'answer': 'pencil',
      'clue': '2'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.question = this.questions[0].question;
  }


  headerClick() {
    if (!this.headerClicked) {
      this.headerClicked = true;
      this.question = `The Doors of Durin, Lord of Moria. Speak, friend, and enter.
      I, Narvi, made them. Celebrimbor of Hollin drew these signs`;
    }
  }

  onSubmit() {
    if (this.showWin) {
      return;
    }

    if (this.answer.toLocaleLowerCase() === this.questions[this.questionNumber].answer) {
      this.headerClicked = true;
      this.clue = this.questions[this.questionNumber].clue;
      this.questionNumber++;
      if (this.questionNumber + 1 > this.questions.length) {
        this.showWin = true;
      } else {
        this.question = this.questions[this.questionNumber].question;
      }
    } else {
      this.showWrong = true;
      setTimeout(() => {
        this.showWrong = false;
      }, 1000);
    }

    this.answer = '';
  }
}
