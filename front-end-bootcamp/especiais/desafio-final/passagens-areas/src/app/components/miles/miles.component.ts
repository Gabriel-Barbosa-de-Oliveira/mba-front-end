import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-miles',
  templateUrl: './miles.component.html',
  styleUrls: ['./miles.component.scss']
})
export class MilesComponent implements OnInit {

  public miles: number = 0;

  @Output() changed: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitChange(){
    this.changed.emit(this.miles)
  }

}
