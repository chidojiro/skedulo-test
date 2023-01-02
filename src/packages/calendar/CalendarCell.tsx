import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React from 'react';

export type CalendarCellProps = ClassName &
  Children & {
    dateMark: Dayjs;
  };

export const CalendarCell = React.memo(
  ({ className, dateMark, ...restProps }: CalendarCellProps) => {
    return (
      <div
        className={clsx('calendar-cell', className)}
        {...restProps}
        data-from={dateMark.toDate()}
      ></div>
    );
  },
);
CalendarCell.displayName = 'CalendarCell';
