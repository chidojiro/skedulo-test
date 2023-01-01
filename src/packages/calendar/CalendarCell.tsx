import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';

export type CalendarCellProps = ClassName &
  Children & {
    timeMark: Dayjs;
  };

export const CalendarCell = ({ className, timeMark, ...restProps }: CalendarCellProps) => {
  return (
    <div
      className={clsx('calendar-cell', className)}
      {...restProps}
      data-from={timeMark.toDate()}
    ></div>
  );
};
