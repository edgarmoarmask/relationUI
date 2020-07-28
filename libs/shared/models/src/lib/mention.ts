import {IEntityLabel} from "./entity";

export interface IEntityMention {
  entityId: string,
  documentId: string;
  startIndex: string;
  endIndex: string;
  date: string;
  uniqueId: string;
}

export interface IEventMention {
  id: string;
  name: string;
  sourceId: string;
  targetId: string;
  documentId: string;
}

export interface IMentions {
  entities: IEntityLabel[];
  eventMentions: IEventMention[];
  entityMentions: IEntityMention[];
}
