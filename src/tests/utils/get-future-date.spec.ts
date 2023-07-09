import { expect, test } from 'vitest';

import { getNextYearDate } from './get-next-year-date';

test('increases date with one year', () => {
    const nextYear = new Date().getFullYear() + 1;

    expect(getNextYearDate('2021-01-01').getFullYear()).toEqual(nextYear);
});
