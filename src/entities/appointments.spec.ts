import { expect, test } from 'vitest';

import { Appointment } from './appointments';
import { getNextYearDate } from '../tests/utils/get-next-year-date';

test('create an appointment', () => {
    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt: getNextYearDate('2024-01-01'),
        endsAt: getNextYearDate('2024-05-01'),
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toBe('John Doe');
});

test('cannot create an appointment with end date before start date', () => {
    const startsAt = getNextYearDate('2022-04-01');
    const endsAt = getNextYearDate('2024-01-01');

    expect(() => {
        new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        });
    }).toThrow();
});

test('cannot create an appointment with start date before now', () => {
    const startsAt = new Date(new Date().getTime() - 1000);
    const endsAt = new Date(new Date().getTime() + 1000);

    expect(() => {
        new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        });
    }).toThrow();
});
