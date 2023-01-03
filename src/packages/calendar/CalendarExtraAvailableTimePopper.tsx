import { Popper, PopperProps, Select } from '@/common/components';
import { Option } from '@/common/types';
import { trimTime } from '@/common/utils';
import dayjs, { Dayjs } from 'dayjs';
import { padStart, range } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';

import './CalendarExtraAvailableTimePopper.scss';
import { timeSlotCount, TIME_GAP } from './constants';
import { CalendarLocalService } from './localService';
import { DateTimeRange, TimeRange } from './types';
import { useExtraAvailability } from './useExtraAvailability';

export type CalendarExtraAvailableTimePopperProps = PopperProps & {
  dateMark: Dayjs;
};

const timeOptions: Option[] = range(timeSlotCount).map((count) => {
  const helperTime = trimTime(dayjs()).add(count * TIME_GAP, 'minute');

  const hour = padStart(helperTime.hour().toString(), 2, '0');
  const minute = padStart(helperTime.minute().toString(), 2, '0');

  return { label: `${hour}:${minute}`, value: `${hour}${minute}` };
});

const allValues = timeOptions.map(({ value }) => value);

export const CalendarExtraAvailableTimePopper = ({
  trigger,
  open,
  onClose,
  dateMark,
  ...restProps
}: CalendarExtraAvailableTimePopperProps) => {
  const { mutate } = useExtraAvailability();

  const defaultSlot = `${padStart(dateMark.hour().toString(), 2, '0')}${padStart(
    dateMark.minute().toString(),
    2,
    '0',
  )}`;

  const date = dateMark.format('YYYY-MM-DD');

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<DateTimeRange>({
    defaultValues: {
      startDate: date,
      endDate: date,
      startTime: defaultSlot,
      endTime: allValues[allValues.indexOf(defaultSlot) + 1],
    },
  });

  const handleValidSubmit = (data: DateTimeRange) => {
    const newData = CalendarLocalService.addExtraAvailability(data);

    mutate(newData);

    onClose?.();
  };

  React.useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Popper open={open} onClose={onClose} trigger={trigger} placement="left-start" {...restProps}>
      <form
        onSubmit={handleSubmit(handleValidSubmit)}
        className="calendar-extra-available-time-popper"
      >
        <h3 className="calendar-extra-available-time-popper__title">Add extra availability</h3>
        <h4 className="calendar-extra-available-time-popper__date">{date}</h4>
        <div className="calendar-extra-available-time-popper__times">
          <div>
            <label className="calendar-extra-available-time-popper__time-label">Start Time: </label>
            <Select
              className="calendar-extra-available-time-popper__time-select"
              options={[{ value: '', label: 'Select a time' }, ...timeOptions]}
              error={!!errors['startTime']}
              {...register('startTime', {
                required: true,
                validate: {
                  invalid: (startTime) => {
                    const { endTime } = getValues();

                    const isStartTimeBeforeEndTime =
                      allValues.indexOf(endTime) > allValues.indexOf(startTime);

                    return isStartTimeBeforeEndTime;
                  },
                },
              })}
            ></Select>
          </div>
          <div>
            <label className="calendar-extra-available-time-popper__time-label">End Time: </label>
            <Select
              className="calendar-extra-available-time-popper__time-select"
              options={[{ value: '', label: 'Select a time' }, ...timeOptions]}
              error={!!errors['endTime']}
              {...register('endTime', {
                required: true,
                validate: {
                  invalid: (endTime) => {
                    const { startTime } = getValues();

                    const isStartTimeBeforeEndTime =
                      allValues.indexOf(endTime) > allValues.indexOf(startTime);

                    return isStartTimeBeforeEndTime;
                  },
                },
              })}
            ></Select>
          </div>
        </div>
        <button className="calendar-extra-available-time-popper__save-button" type="submit">
          Save
        </button>
      </form>
    </Popper>
  );
};
