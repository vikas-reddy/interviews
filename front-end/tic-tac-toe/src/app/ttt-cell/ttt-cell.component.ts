import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ttt-cell',
  templateUrl: './ttt-cell.component.html',
  styleUrls: ['./ttt-cell.component.scss']
})
export class TttCellComponent implements OnInit {

  @Input()
  val: 'O' | 'X';

  @Output()
  cellClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCellClick() {
    this.cellClicked.emit();
  }
}
