import useSWR from 'swr';
import { CalendarLocalService } from './localService';

export const useExtraAvailability = () => {
  return useSWR('useExtraAvailability', () => CalendarLocalService.getExtraAvailability());
};
