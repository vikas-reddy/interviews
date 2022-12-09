import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';

  readonly cells = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  nextPlayer: 'O' | 'X' = 'O';
  winner: 'O' | 'X' | 'tie' = null;
  turns = 0;
  isGameActive = true;

  currentRating: number | null = null;

  cellClicked(row: number, col: number) {
    if (!this.isGameActive) {
      return false;
    }

    this.turns++;
    this.cells[row][col] = this.nextPlayer;
    this.checkWinner(row, col);
    if (this.winner) {
      this.isGameActive = false;
    } else if (this.turns === 9) {
      this.winner = 'tie';
      this.isGameActive = false;
    }
    this.nextPlayer = this.nextPlayer === "O" ? "X" : "O";
  }

  checkWinner(row: number, col: number) {
    // Check diagonal
    if (row === col) {
      if(this.cells[0][0] === this.cells[1][1] &&
        this.cells[1][1] === this.cells[2][2]) {
          this.winner = this.nextPlayer;
          return;
        }
    }

    // Check diagonal
    if (row + col === 2) {
      if(this.cells[0][2] === this.cells[1][1] &&
        this.cells[1][1] === this.cells[2][0]) {
          this.winner = this.nextPlayer;
          return;
        }
    }

    // Check row
    if (this.cells[row][0] === this.cells[row][1] &&
      this.cells[row][1] === this.cells[row][2]) {
      this.winner = this.nextPlayer;
      return;
    }

    // Check col
    if (this.cells[0][col] === this.cells[1][col] &&
      this.cells[1][col] === this.cells[2][col]) {
      this.winner = this.nextPlayer;
      return;
    }
  }

  restartGame() {
    for (const row of this.cells) {
      for (let i = 0; i < row.length; i++) {
        row[i] = null;
      }
    }
    this.turns = 0;
    this.isGameActive = true;
    this.nextPlayer = 'O';
  }

  onRated(rating) {
    this.currentRating = rating;
  }
}
