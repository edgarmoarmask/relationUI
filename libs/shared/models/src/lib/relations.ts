import {IEntity} from './entity';
import {IEvent} from './event';

export interface IRelations {
  entities: IEntity[];
  events: IEvent[];
}
