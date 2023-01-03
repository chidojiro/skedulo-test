import workingTime from './mockWorkingTime.json';
import { TimeRange } from './types';

export const useWorkingTime = () => {
  return { workingTime: workingTime as Record<string, TimeRange> };
};
