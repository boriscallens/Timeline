import { Component, OnInit, Input } from '@angular/core';
import { IPhase} from './phase.model';
import { IMilestone} from './milestone.model';
import { getRange } from '../utils/dayjs.util';

import * as dayjs from 'dayjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() Phases: IPhase[] = [];
  @Input() Milestones: IMilestone[] = [];

  TotalDays = 954;
  Width = 954;
  Height = 200;

  AllDays: dayjs.Dayjs[] = [];

  constructor() { }

  ngOnInit(): void {
    const dates = this.Milestones
      .map(m => m.dateUTC)
      .concat(this.Phases.flatMap(p => [p.startUTC, p.endUTC]))
      .map(dateUTC => dayjs(dateUTC));

    this.AllDays = getRange(dates);
  }
}
