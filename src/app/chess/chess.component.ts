import { Component, OnInit } from '@angular/core';
import { Chess, ChessMove } from 'chess.js';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const chess: Chess = new (<any>window).Chess();

    while (!chess.game_over()) {
      const moves: ChessMove[] = chess.moves();
      const move: ChessMove = moves[Math.floor(Math.random() * moves.length)];
      console.log(move);
      chess.move(move);
    }
    console.log(chess.pgn());
  }

}
