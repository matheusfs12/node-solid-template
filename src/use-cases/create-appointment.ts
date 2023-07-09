import { Appointment } from '../entities/appointments';
import { AppointmentsRepository } from '../repositories/appointments-repository';

interface CreateAppointmentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
    constructor(
        private readonly appointmentsRepository: AppointmentsRepository
    ) {}

    async execute({
        customer,
        startsAt,
        endsAt,
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointment =
            await this.appointmentsRepository.findOverlapping(startsAt, endsAt);

        if (overlappingAppointment) {
            throw new Error('Overlapping appointments are not allowed');
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt,
        });

        await this.appointmentsRepository.create(appointment);

        return appointment;
    }
}
