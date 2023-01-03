import { Option } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

import './Select.scss';

export type SelectProps = JSX.IntrinsicElements['select'] & {
  options: Option[];
  error?: boolean;
};

export const Select = React.forwardRef(
  ({ className, options, error, ...restProps }: SelectProps, ref: any) => {
    return (
      <select
        ref={ref}
        className={clsx('select', error && 'select--error', className)}
        {...restProps}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = 'Select';
