import { Children, ClassName } from '@/common/types';
import React from 'react';

export type CalendarCellProps = Children &
  ClassName & {
    //
  };

export const CalendarCell = ({ children }: CalendarCellProps) => {
  return <div className="calendar-cell">{children}</div>;
};
