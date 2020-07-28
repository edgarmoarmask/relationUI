import {Injectable} from '@nestjs/common';

import {
  IEntity,
  IDocumentLabel,
  IRelations,
  IMention,
  IMentions,
  IEvent,
  IEntityLabel,
  IEntityProfile,
  IEntityDateGroup
} from '@eagleye/shared/models';
import {Configuration} from '../config';

@Injectable()
export class EntityService {

  findByName(name: string): IEntity[] {

    return Configuration.Entities.filter(entity => entity.name.toLowerCase().includes(name.toLowerCase()));
  }

  findRelations(id: string): IRelations {

    const events: IEvent[] = Configuration.Events.filter(event => event.sourceId === id);

    const targetIds: string[] = events.map(event => event.targetId);

    const entities: IEntity[] = Configuration.Entities.filter(entity => targetIds.includes(entity.id));

    return {
      entities,
      events
    } as IRelations;
  }

  getGroupedEntitiesByDates(): IEntityDateGroup[] {

    const entityGroups: IEntityDateGroup[] = Configuration.Mentions
      .map(mention => mention.date)
      .filter((date, index, self) => self.indexOf(date) === index)
      .map(function (date) {
        return {
          date: date,
          entities: Configuration.Mentions
            .filter(mention => mention.date === date)
            .map(mention => mention.entityId)
        }
      });

    return entityGroups;
  }

  findMentions(documentId: string): IMentions {

    const entities: IEntityLabel[] = Configuration.Entities
      .filter(entity => entity.documents.filter(document => document.id === documentId))
      .map(entity => {
        return {
          id: entity.id,
          name: entity.name
        }
      });

    const entityIds: string[] = entities.map(entity => entity.id);

    const events: IEvent[] = Configuration.Events.filter(
      event => event.documentId === documentId && entityIds.includes(event.sourceId) && entityIds.includes(event.targetId)
    );

    const relations: IMention[] = Configuration.Mentions.filter(mention => mention.documentId === documentId);

    return {
      entities,
      events,
      relations
    } as IMentions;
  }

  getProfile(id: string): IEntityProfile {

    const entity: IEntity = Configuration.Entities.find(entity => entity.id === id);

    const documents: IDocumentLabel[] = Configuration.Documents
      .filter(document => entity.documents.filter(doc => doc.id === document.id))
      .map(document => ({id: document.id, name: document.name, date: document.date}));

    const relations: IRelations = this.findRelations(id);

    const entityProfile: IEntityProfile = {
      id: entity.id,
      name: entity.name,
      image: entity.image,
      type: entity.type,
      address: entity.address,
      geoLocation: entity.geoLocation,
      properties: entity.properties,
      documents,
      relations
    };

    return entityProfile;
  }
}
