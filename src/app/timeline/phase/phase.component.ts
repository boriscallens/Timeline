import { Component, OnInit, Input } from '@angular/core';

import { IPhase } from './phase.model';
import { Timeline } from '../timeline.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g[timeline-phase]',
  templateUrl: './phase.component.svg',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit {

  @Input()
  timeline: Timeline;
  @Input()
  phase: IPhase;

  @Input()
  height: number;
  @Input()
  width: number;



  labelX = 20;
  labelY = 20;
  path: string;

  constructor() { }

  ngOnInit(): void {



    this.DrawGullwings();
  }

  private DrawGullwings(): void {
    const gullMargin = 0.5;
    const gullwingHeight = this.height / 2;
    const tipHeight = gullwingHeight / 3;
    const tipWidth = 10;
    const curveHeight = gullwingHeight - tipHeight;
    const curveWidth = 15;

    const startX = 0.5;
    const startY = this.height - 5;
    const leftCurveEndX = curveWidth;
    const leftCurveEndY = this.height - curveHeight;

    const horizontalLength = (this.width / 2) - curveWidth - (tipWidth / 2);

    const rightCurveEndX = this.width - gullMargin;
    const rightCurveEndY = startY;

    // can probably be simplified by using Q instead of S
    this.path = ` M ${startX},${startY}
                  S ${gullMargin}, ${curveHeight * 2} ${leftCurveEndX},${leftCurveEndY}
                  h ${horizontalLength}
                  c 1,0 2,-0.5 2.5,-2 0,1 1,1.6 2.5,2
                  h ${horizontalLength}
                  S ${rightCurveEndX}, ${curveHeight * 2} ${rightCurveEndX},${rightCurveEndY}`;
  }
}
