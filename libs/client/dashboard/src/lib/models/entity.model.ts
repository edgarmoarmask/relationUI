import {IEntity} from '@eagleye/shared/models';

export interface IChosenEntity extends IEntity {
  position: IEntityPosition;
}

export interface IEntityPosition {
  x: number;
  y: number;
}
