import { Dayjs } from 'dayjs';

export const trimTime = (day: Dayjs) => day.hour(0).minute(0).second(0).millisecond(0);
