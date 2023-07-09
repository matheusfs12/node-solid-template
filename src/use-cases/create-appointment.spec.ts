import { describe, expect, it } from 'vitest';

import { Appointment } from '../entities/appointments';
import { CreateAppointment } from './create-appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory-appointments-repository';
import { getNextYearDate } from '../tests/utils/get-next-year-date';

describe('create an appointment', () => {
    it('should be able to create an appointment', () => {
        const sut = new CreateAppointment(new InMemoryAppointmentsRepository());

        expect(
            sut.execute({
                customer: 'John Doe',
                startsAt: getNextYearDate('2023-10-01'),
                endsAt: getNextYearDate('2023-10-05'),
            })
        ).resolves.toBeInstanceOf(Appointment);
    });

    it('should not be able to create an appointment with overlapping dates', async () => {
        const createAppointment = new CreateAppointment(
            new InMemoryAppointmentsRepository()
        );

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt: getNextYearDate('2023-10-01'),
            endsAt: getNextYearDate('2023-10-05'),
        });

        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startsAt: getNextYearDate('2023-10-04'),
                endsAt: getNextYearDate('2023-10-06'),
            })
        ).rejects.toThrow('Overlapping appointments are not allowed');

        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startsAt: getNextYearDate('2023-09-30'),
                endsAt: getNextYearDate('2023-10-02'),
            })
        ).rejects.toThrow('Overlapping appointments are not allowed');

        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startsAt: getNextYearDate('2023-10-01'),
                endsAt: getNextYearDate('2023-10-03'),
            })
        ).rejects.toThrow('Overlapping appointments are not allowed');

        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startsAt: getNextYearDate('2023-10-06'),
                endsAt: getNextYearDate('2023-10-10'),
            })
        ).resolves.toBeInstanceOf(Appointment);
    });
});
