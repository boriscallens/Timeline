import * as dayjs from 'dayjs';

import { DateRange, getMonths } from '../../utils/dayjs.util';
import { getGullWingPath } from '../../utils/svg.util';

import { IMilestone } from './milestone.model';
import { IAxis } from './axis.model';
import { IPhase } from './phase.model';

export class Timeline {
    axis: IAxis;

    dayTicks: IDayTick[];
    monthMarks: IMark[];
    phaseMarks: IMark[];
    milestoneTicks: (ITick & IMilestone)[];

    constructor(
        private milestones: IMilestone[],
        private phases: IPhase[],
        private width: number = 954,
        private height: number = 100) {

        const range = new DateRange(this.milestones, this.phases, this.width);
        this.dayTicks = this.getDayTicks(range, [1, 5, 10, 15, 20, 25]);
        this.monthMarks = this.getMonthMarks(range);
        this.milestoneTicks = this.milestones.map(milestone => this.getMilestoneTick(milestone, range)).slice(0, 1);

        this.axis = {
            x1: 0,
            y1: height / 2,
            x2: width,
            y2: height / 2,
        } as IAxis;
    }

    public getDayTicks(range: DateRange, filter: number[]): IDayTick[] {
        const filteredDays = range.days.filter(d => filter.includes(d.date()));
        return filteredDays.map(d => this.getDayTick(d, range));
    }
    public getDayTick(day: dayjs.Dayjs, range: DateRange): IDayTick {
        const isStartOfYear = day.startOf('y').isSame(day, 'day');
        const isStartOfMonth = day.startOf('M').isSame(day, 'day');

        return {
            label: isStartOfYear ? day.format('YYYY') : day.format('DD'),
            isStartOfYear,
            isStartOfMonth,
            labelX: isStartOfYear ? -14 : -6,
            transform: `translate(${range.getX(day)}, ${this.height / 2})`
        } as IDayTick;
    }
    public getMonthMarks(range: DateRange): IMark[] {
        return getMonths(range.days).map(month => {
            const x1 = range.getX(month.firstDay);
            const x2 = range.getX(month.lastDay);
            const totalWidth = x2 - x1;
            return {
                label: month.label.toLowerCase(),
                x1, x2,
                transform: `translate(${x1 + 10}, ${(this.height / 2) - 23})`,
                labelX: totalWidth / 2 - 6,
                labelY: 10,
                path: getGullWingPath(20, totalWidth, 4, 4, 0, 0)
            } as IMark;
        });
    }
    public getMilestoneTick(milestone: IMilestone, range: DateRange): ITick & IMilestone {
        const tick = {
            label: milestone.name,
            transform: `translate(${range.getXUTC(milestone.dateUTC)}, ${0})`
        } as ITick;
        return {... milestone, ... tick} as ITick & IMilestone;
    }
    public getPhaseTick(phase: IPhase, range: DateRange, height: number): IMark {
        return {
            label: phase.name,
            transform: `translate(${range.getXUTC(phase.startUTC)}, ${height / 2})`
        } as IMark;
    }

    public getTextWidth(): number {
        return 100;
    }
}

export interface ITick {
    label: string;
    labelX: number;
    transform: string;
}
export interface IDayTick extends ITick {
    isStartOfYear: boolean;
    isStartOfMonth: boolean;
}
export interface IMark {
    label: string;
    labelX: number;
    labelY: number;

    transform: string;
    path: string;
}
