import { Children } from '@/common/types';
import React from 'react';

import './MainLayout.scss';

export type MainLayoutProps = Children & {
  //
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className="main-layout">{children}</main>;
};
