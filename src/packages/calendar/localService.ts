import { LocalStorage } from '@/common/utils';
import { DateTimeRange } from './types';

const LOCAL_STORAGE_KEY = 'extraAvailability';

const getExtraAvailability = () => {
  return (LocalStorage.get(LOCAL_STORAGE_KEY) as DateTimeRange[]) ?? [];
};

const addExtraAvailability = (timeRange: DateTimeRange) => {
  const currentExtraAvailability = getExtraAvailability();

  const newData = [...currentExtraAvailability, timeRange];

  LocalStorage.set(LOCAL_STORAGE_KEY, newData);

  return newData;
};

export const CalendarLocalService = {
  getExtraAvailability,
  addExtraAvailability,
};
