import { IRelations } from './relations';
import { IDocumentLabel } from './document';

interface IEntityBase {
  id: string;
  name: string;
  image: string;
  type: string;
  geoLocation: string;
  address: string;
}

export interface IEntity extends IEntityBase {
  documents: IEntityDocument[];
  properties: IEntityProperty[];
}

export interface IEntityDocument {
  id: string;
  name: string
}

export interface IEntityProperty {
  name: string;
  value: string | number;
}

export interface IEntityLabel {
  id: string;
  name: string;
  type: string;
}

export interface IEntityProfile extends IEntityBase {
  properties: IEntityProperty[];
  documents: IDocumentLabel[];
  relations: IRelations;
}

export interface IEntityDateGroup {
  date: string;
  entities: string[];
}
