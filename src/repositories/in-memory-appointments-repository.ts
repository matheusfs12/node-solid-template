import { Appointment } from '../entities/appointments';
import { AppointmentsRepository } from './appointments-repository';
import { areIntervalsOverlapping } from 'date-fns';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
    public items: Appointment[] = [];

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    async findOverlapping(
        startDate: Date,
        endDate: Date
    ): Promise<Appointment | null> {
        const overlappingAppointment = this.items.find((appointment) => {
            return areIntervalsOverlapping(
                { start: startDate, end: endDate },
                { start: appointment.startsAt, end: appointment.endsAt },
                { inclusive: true }
            );
        });

        return overlappingAppointment || null;
    }
}
