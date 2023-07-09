import { parseISO, setYear } from 'date-fns';

export function getNextYearDate(date: string): Date {
    return setYear(parseISO(date), new Date().getFullYear() + 1);
}
