import workingTime from './mockWorkingTime.json';
import { WorkingTime } from './types';

export const useWorkingTime = () => {
  return { workingTime: workingTime as Record<string, WorkingTime> };
};
