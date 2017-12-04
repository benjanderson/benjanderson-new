import { Component, OnInit } from '@angular/core';
import { Chess, ChessMove } from 'chess.js';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {
  public chess: Chess;

  constructor() {
    this.chess = new (<any>window).Chess();
  }

  ngOnInit() {
    console.log(this.chess.SQUARES);
    while (!this.chess.game_over()) {
      const moves: ChessMove[] = this.chess.moves();
      const move: ChessMove = moves[Math.floor(Math.random() * moves.length)];
      this.chess.move(move);
    }
    console.log(this.chess.pgn());

    interact('.draggable')
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          // restriction: 'parent',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        // onend: function (event) {
        //   let textEl = event.target.querySelector('p');

        //   textEl && (textEl.textContent =
        //     'moved a distance of '
        //     + (Math.sqrt(event.dx * event.dx +
        //       event.dy * event.dy) | 0) + 'px');
        // }
      });
  }

  public dragMoveListener(event) {
    const target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }


}
