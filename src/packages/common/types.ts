import React from 'react';

export type Children = {
  children?: React.ReactNode;
};

export type ClassName = {
  className?: string;
};

export type OpenClose = {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
};

export type Option<T = string, P = React.ReactNode> = {
  value: T;
  label: P;
};
