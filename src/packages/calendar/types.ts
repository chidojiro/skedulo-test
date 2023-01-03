import { Dayjs } from 'dayjs';

export type TimeRange = {
  startTime: string;
  endTime: string;
};

export type DateTimeRange = TimeRange & {
  startDate: string;
  endDate: string;
};

export type TimeRangeAsDayjs = {
  startTime: Dayjs;
  endTime: Dayjs;
};
