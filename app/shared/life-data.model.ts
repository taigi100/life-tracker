import {LifeDirection} from './life-direction.model';
import { dayData } from './day.model';

export interface LifeData {
   currentDay: number,
   today: dayData,
   days: dayData[],
   total: LifeDirection[];
}
