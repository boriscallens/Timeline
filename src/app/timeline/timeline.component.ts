import { Component, OnInit, Input } from '@angular/core';
import { IPhase} from './phase.model';
import { IMilestone} from './milestone.model';
import { Timeline} from './timeline.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() Phases: IPhase[] = [];
  @Input() Milestones: IMilestone[] = [];

  Timeline: Timeline;

  Width = 954;
  Height = 100;
  constructor() { }

  ngOnInit(): void {
    this.Timeline = new Timeline(this.Milestones, this.Phases, this.Width);
  }
}
