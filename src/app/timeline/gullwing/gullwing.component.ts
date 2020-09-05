import { Component, OnInit } from '@angular/core';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g[gullwing]',
  templateUrl: './gullwing.component.svg',
  styleUrls: ['./gullwing.component.scss']
})
export class GullwingComponent implements OnInit {

  path = 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z';

  constructor() { }

  ngOnInit(): void {
  }

}
