import { getRange } from './dayjs.util';
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
});
