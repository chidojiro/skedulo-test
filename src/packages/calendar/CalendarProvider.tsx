import { Children } from '@/common/types';
import { createContext, trimTime } from '@/common/utils';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

export type CalendarProviderValue = {
  today: Dayjs;
  viewingWeek: Dayjs;
  viewPreviousWeek: () => void;
  viewNextWeek: () => void;
  viewThisWeek: () => void;
};

const [Provider, useCalendarContext] = createContext<CalendarProviderValue>();

export type CalendarProviderProps = Children & {
  //
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const today = React.useMemo(() => trimTime(dayjs()), []);
  const [viewingWeek, setViewingWeek] = React.useState(React.useMemo(() => today.day(0), [today]));

  const viewPreviousWeek = React.useCallback(() => {
    setViewingWeek(viewingWeek.date(viewingWeek.date() - 7));
  }, [viewingWeek]);

  const viewNextWeek = React.useCallback(() => {
    setViewingWeek(viewingWeek.date(viewingWeek.date() + 7));
  }, [viewingWeek]);

  const viewThisWeek = React.useCallback(() => {
    setViewingWeek(today.day(0));
  }, [today]);

  const value = React.useMemo<CalendarProviderValue>(
    () => ({ today, viewingWeek, viewNextWeek, viewPreviousWeek, viewThisWeek }),
    [today, viewingWeek, viewNextWeek, viewPreviousWeek, viewThisWeek],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { useCalendarContext };
