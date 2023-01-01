import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

import './MainLayout.scss';

export type MainLayoutProps = Children &
  ClassName & {
    //
  };

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return <main className={clsx('main-layout', className)}>{children}</main>;
};
