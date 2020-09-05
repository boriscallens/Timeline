import { getRange, getX, getMonths, IMonth } from './dayjs.util';
import * as dayjs from 'dayjs';

describe('dayjs', () => {
    describe('getRange', () => {
        it('should return all days between two days', () => {
            const start = dayjs(new Date(2020, 0, 1));
            const end = dayjs(new Date(2020, 1, 1));
            const allDays = getRange([start, end]);

            expect(allDays.length).toBe(32);
        });

        it('should include the min and max dates', () => {
            const start = dayjs(new Date(2020, 0, 1));
            const end = dayjs(new Date(2020, 1, 1));
            const allDays = getRange([start, end]);

            expect(allDays).toContain(start);
            expect(allDays).toContain(end);
        });
    });

    describe('getX', () => {
        it('should return 0 for the first day', () => {
            const max = 150;
            const start = dayjs(new Date(2020, 0, 1));
            const end = dayjs(new Date(2020, 1, 1));
            const x = getX(start, [start, end], max);

            expect(x).toBe(0);
        });
        it('should return max for the last day', () => {
            const max = 150;
            const start = dayjs(new Date(2020, 0, 1));
            const end = dayjs(new Date(2020, 1, 1));
            const x = getX(end, [start, end], max);

            expect(x).toBe(max);
        });
        it('should return interpolated for each day', () => {
            const max = 20;
            const start = dayjs(new Date(2020, 0, 1));
            const end = dayjs(new Date(2020, 0, 20));
            const x = getX(dayjs(new Date(2020, 0, 10)), [start, end], max);

            expect(x).toBeCloseTo(10, 0);
        });
    });

    fdescribe('getMonths', () => {
        it('should return the month shortname, first and last day', () => {
            const januaryFirst = dayjs(new Date(2000, 0, 1));
            const januaryLast = dayjs(new Date(2000, 0, 31));
            const months = getMonths([januaryFirst]);

            const month = {
                label: januaryFirst.format('MMM'),
                firstDay: januaryFirst,
                lastDay: januaryLast
            } as IMonth;

            expect(months[0].label).toBe(month.label);
            expect(months[0].firstDay).toEqual(month.firstDay);
            expect(months[0].lastDay).toEqual(month.lastDay);
        });

        it('should return the months in the correct order', () => {
            const januaryFirst = dayjs(new Date(2000, 0, 1));
            const februaryFirst = dayjs(new Date(2000, 1, 1));
            const decemberFirst = dayjs(new Date(2000, 11, 1));
            const months = getMonths([februaryFirst, decemberFirst, januaryFirst]);

            expect(months[0].firstDay).toEqual(januaryFirst);
            expect(months[1].firstDay).toEqual(februaryFirst);
            expect(months[2].firstDay).toEqual(decemberFirst);
        });
    });
});
