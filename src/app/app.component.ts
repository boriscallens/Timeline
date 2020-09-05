import { Component } from '@angular/core';
import { IMilestone } from './timeline/milestone.model';
import { IPhase } from './timeline/phase/phase.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Timeline';

  // Watch out! Months are the only datepart that is 0 based :O
  phases = [
    {name: 'registration', startUTC: Date.UTC(2019, 10, 12), endUTC: Date.UTC(2020, 3, 6)},
    {name: 'decision', startUTC: Date.UTC(2020, 1, 27), endUTC: Date.UTC(2020, 3, 6)},
    {name: 'hidden week', startUTC: Date.UTC(2020, 2, 28), endUTC: Date.UTC(2020, 3, 6)},
  ] as IPhase[];
  // Watch out! Months are the only datepart that is 0 based :O
  milestones = [
    {name: 'auction', dateUTC: Date.UTC(2020, 1, 11)},
    {name: 'personal offer', dateUTC: Date.UTC(2020, 1, 28)},
    {name: 'registration extension 1', dateUTC: Date.UTC(2020, 1, 10)},
    {name: 'registration extension 2', dateUTC: Date.UTC(2020, 2, 28)},
  ] as IMilestone[];
}
