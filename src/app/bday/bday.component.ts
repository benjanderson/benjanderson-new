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
      'question': '<h2>Ennyn Durin Aran Moria. Pedo Mellon a Minno. Im Narvi hain echant. Celebrimbor o Eregion teithant i thiw hin.</h2>',
      'answer': 'friend',
      'clue': '6'
    },
    {
      'question': '<h2>What year was this photo taken?</h2><img class="img-fluid" src="https://i.imgur.com/GOkl9Nk.png"/>',
      'answer': '2004',
      'clue': null
    },
    {
      'question': '<h2>Where was this photo taken?</h2><img class="img-fluid" src="https://i.imgur.com/QVttOJq.png"/>',
      'answer': 'gator land',
      'clue': null
    },
    {
      'question': '<h2>What area was this photo taken in?</h2><img class="img-fluid" src="https://i.imgur.com/Iflq4N3.png"/>',
      'answer': 'el paso',
      'clue': null
    },
    {
      'question': `<h2>Square root of ((years of marriage * Anderson grand children)
       - (bedrooms in our house * Mason age in months) + years in house)</h2>`,
      'answer': '9',
      'clue': '11'
    },
    {
      'question': `<h2>As a stone inside a tree, Ill help your words outlive thee.
      But if you push me as I stand, the more I move the less I am.</h2>`,
      'answer': 'pencil',
      'clue': '37'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.question = this.questions[0].question;
  }


  headerClick() {
    if (!this.headerClicked) {
      this.headerClicked = true;
      this.question = `<h2>The Doors of Durin, Lord of Moria. Speak, friend, and enter.
      I, Narvi, made them. Celebrimbor of Hollin drew these signs</h2>`;
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
      this.answer = '';
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
