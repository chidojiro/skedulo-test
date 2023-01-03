import { Popper } from '@/common/components';
import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React from 'react';
import { CalendarExtraAvailableTimePopper } from './CalendarExtraAvailableTimePopper';

export type CalendarCellProps = ClassName &
  Children & {
    dateMark: Dayjs;
  };

export const CalendarCell = React.memo(
  ({ className, dateMark, ...restProps }: CalendarCellProps) => {
    return (
      <CalendarExtraAvailableTimePopper
        trigger={
          <button
            className={clsx('calendar-cell', className)}
            {...restProps}
            data-from={dateMark.toDate()}
          ></button>
        }
      />
    );
  },
);
CalendarCell.displayName = 'CalendarCell';
