import { useDisclosure } from '@/common/hooks';
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
    const popperDisclosure = useDisclosure();

    return (
      <CalendarExtraAvailableTimePopper
        dateMark={dateMark}
        open={popperDisclosure.isOpen}
        onClose={popperDisclosure.close}
        trigger={
          <button
            className={clsx('calendar-cell', className)}
            {...restProps}
            data-from={dateMark.toDate()}
            onClick={popperDisclosure.toggle}
          ></button>
        }
      />
    );
  },
);
CalendarCell.displayName = 'CalendarCell';
