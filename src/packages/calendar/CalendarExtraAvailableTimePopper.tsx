import { Popper, PopperProps, Select } from '@/common/components';
import { Option } from '@/common/types';
import { trimTime } from '@/common/utils';
import dayjs from 'dayjs';
import { padStart, range } from 'lodash-es';
import React from 'react';

import './CalendarExtraAvailableTimePopper.scss';
import { timeSlotCount, TIME_GAP } from './constants';

export type CalendarExtraAvailableTimePopperProps = Pick<PopperProps, 'trigger'> & {
  //
};

const timeOptions: Option[] = range(timeSlotCount).map((count) => {
  const helperTime = trimTime(dayjs()).add(count * TIME_GAP, 'minute');

  const hour = padStart(helperTime.hour().toString(), 2, '0');
  const minute = padStart(helperTime.minute().toString(), 2, '0');

  return { label: `${hour}:${minute}`, value: `${hour}${minute}` };
});

export const CalendarExtraAvailableTimePopper = ({
  trigger,
}: CalendarExtraAvailableTimePopperProps) => {
  return (
    <Popper trigger={trigger} placement="left">
      <div className="calendar-extra-available-time-popper">
        <h3 className="calendar-extra-available-time-popper__title">Add extra availability</h3>
        <div className="calendar-extra-available-time-popper__times">
          <div>
            <label className="calendar-extra-available-time-popper__time-label">Start Time: </label>
            <Select
              className="calendar-extra-available-time-popper__time-select"
              options={[{ value: '', label: 'Select a time' }, ...timeOptions]}
            ></Select>
          </div>
          <div>
            <label className="calendar-extra-available-time-popper__time-label">End Time: </label>
            <Select
              className="calendar-extra-available-time-popper__time-select"
              options={[{ value: '', label: 'Select a time' }, ...timeOptions]}
            ></Select>
          </div>
        </div>
        <button className="calendar-extra-available-time-popper__save-button" type="submit">
          Save
        </button>
      </div>
    </Popper>
  );
};
