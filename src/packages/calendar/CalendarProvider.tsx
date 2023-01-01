import { Children } from '@/common/types';
import { createContext, trimTime } from '@/common/utils';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

export type CalendarProviderValue = {
  today: Dayjs;
  viewingWeek: Dayjs;
};

const [Provider, useCalendarContext] = createContext<CalendarProviderValue>();

export type CalendarProviderProps = Children & {
  //
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const today = React.useMemo(() => trimTime(dayjs()), []);
  const viewingWeek = React.useMemo(() => today.day(0), [today]);

  const value = React.useMemo<CalendarProviderValue>(
    () => ({ today, viewingWeek }),
    [viewingWeek, today],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { useCalendarContext };
