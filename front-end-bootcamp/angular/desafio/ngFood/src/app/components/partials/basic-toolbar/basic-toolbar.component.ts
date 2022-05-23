import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-toolbar',
  templateUrl: './basic-toolbar.component.html',
  styleUrls: ['./basic-toolbar.component.scss']
})
export class BasicToolbarComponent implements OnInit {

  @Input() title: string = "Título";

  constructor() { }

  ngOnInit(): void {
  }

}
