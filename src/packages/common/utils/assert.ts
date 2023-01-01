import React from 'react';
import { isNull, isUndefined, get } from 'lodash-es';

export const isRef = <T = Element>(target: unknown): target is React.RefObject<T> =>
  !!target && Object.prototype.hasOwnProperty.call(target, 'current');

export const isNullOrUndefined = (value: unknown): value is undefined | null =>
  isNull(value) || isUndefined(value);

export const isChangeEvent = <T = unknown>(data: unknown): data is React.ChangeEvent<T> => {
  return Object.prototype.hasOwnProperty.call(get(data, 'target'), 'value');
};

export const isHTMLElement = (data: unknown): data is HTMLElement => !!get(data, 'tagName');
