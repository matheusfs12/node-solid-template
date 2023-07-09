import { Appointment } from '../entities/appointments';

export interface AppointmentsRepository {
    create(appointment: Appointment): Promise<void>;
    findOverlapping(
        startDate: Date,
        endDate: Date
    ): Promise<Appointment | null>;
}
