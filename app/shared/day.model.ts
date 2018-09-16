import { LifeDirection } from './life-direction.model';

export interface dayData {
   day: number,
   startDate: Date,
   endDate: Date,
   stats: LifeDirection[]
}
