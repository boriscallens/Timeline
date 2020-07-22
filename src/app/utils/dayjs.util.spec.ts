import { getRange, getX } from './dayjs.util';
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
});
