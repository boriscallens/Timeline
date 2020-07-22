import { IMilestone } from './milestone.model';
import { IPhase } from './phase.model';
import * as dayjs from 'dayjs';
import { getRange, getX } from '../utils/dayjs.util';

export class Timeline {
    allDays: dayjs.Dayjs[];
    dayTicks: ITick[];

    constructor(
        private milestones: IMilestone[],
        private phases: IPhase[],
        private width: number = 100) {

        const dates = this.milestones
            .map(m => m.dateUTC)
            .concat(this.phases.flatMap(p => [p.startUTC, p.endUTC]))
            .map(dateUTC => dayjs(dateUTC));

        this.allDays = getRange(dates);
        this.dayTicks = this.getDayTicks(this.allDays, [1, 5, 10, 15, 20, 25], this.width);
    }

    public getDayTicks(days: dayjs.Dayjs[], filter: number[], width: number): ITick[] {
        const filteredDays = days.filter(d => filter.includes(d.date()));
        return filteredDays.map<ITick>(d => this.getDayTick(d, days));
    }
    public getDayTick(day: dayjs.Dayjs, days: dayjs.Dayjs[]): ITick {
        return {
            label: day.format('DD'),
            x: getX(day, days, this.width)
        } as ITick;
    }
}

export interface ITick {
    label: string;
    x: number;
}
